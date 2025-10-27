-- Initial schema generated from architecture specification.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users and Wallets
CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" text UNIQUE,
  "display_name" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "user_wallets" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "chain" text NOT NULL DEFAULT 'base',
  "address" text NOT NULL,
  "is_primary" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("chain", "address"),
  CONSTRAINT "uq_user_primary" UNIQUE ("user_id", "is_primary") DEFERRABLE INITIALLY IMMEDIATE
);

-- Deposits & Token Accounting
CREATE TABLE "deposits" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "tx_hash" text NOT NULL,
  "chain" text NOT NULL DEFAULT 'base',
  "asset" text NOT NULL DEFAULT 'USDC',
  "amount_usdc" numeric(38,18) NOT NULL CHECK ("amount_usdc" > 0),
  "status" text NOT NULL CHECK ("status" IN ('pending','confirmed','failed')),
  "meta" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("tx_hash")
);

CREATE TABLE "token_ledger" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "change_amount" numeric(38,18) NOT NULL,
  "reason" text NOT NULL CHECK ("reason" IN ('deposit_reward','order_fee','manual_adjust')),
  "ref_id" uuid,
  "balance_after" numeric(38,18) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "token_supply_guard" (
  "id" int PRIMARY KEY DEFAULT 1,
  "total_supply" numeric(38,18) NOT NULL DEFAULT 1000000000,
  "distributed" numeric(38,18) NOT NULL DEFAULT 0
);

-- AI Providers, Keys, Prompts, Agents
CREATE TABLE "ai_providers" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL UNIQUE,
  "api_base" text,
  "model_catalog" jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE "ai_api_keys" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "provider_id" uuid NOT NULL REFERENCES "ai_providers"("id") ON DELETE CASCADE,
  "key_alias" text NOT NULL,
  "encrypted_key" text NOT NULL,
  "rate_limit_per_min" int NOT NULL DEFAULT 60,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("provider_id", "key_alias")
);

CREATE TABLE "prompts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "provider_id" uuid NOT NULL REFERENCES "ai_providers"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("provider_id", "name")
);

CREATE TABLE "ai_agents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "provider_id" uuid NOT NULL REFERENCES "ai_providers"("id") ON DELETE RESTRICT,
  "api_key_id" uuid NOT NULL REFERENCES "ai_api_keys"("id") ON DELETE RESTRICT,
  "prompt_id" uuid NOT NULL REFERENCES "prompts"("id") ON DELETE RESTRICT,
  "agent_name" text NOT NULL,
  "model_name" text NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("api_key_id", "prompt_id")
);

-- Market Snapshots
CREATE TABLE "market_snapshots" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "source" text NOT NULL DEFAULT 'hyperliquid',
  "symbol" text NOT NULL,
  "timeframe" text NOT NULL,
  "snapshot_at" timestamptz NOT NULL,
  "current" jsonb NOT NULL,
  "intraday" jsonb NOT NULL,
  "longterm" jsonb NOT NULL,
  "oi_funding" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("symbol","timeframe","snapshot_at")
);

-- Accounts & Balances
CREATE TABLE "ai_accounts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "agent_id" uuid NOT NULL REFERENCES "ai_agents"("id") ON DELETE CASCADE,
  "exchange" text NOT NULL DEFAULT 'hyperliquid',
  "account_label" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("agent_id","exchange")
);

CREATE TABLE "ai_balance" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL REFERENCES "ai_accounts"("id") ON DELETE CASCADE,
  "equity_usd" numeric(38,18) NOT NULL,
  "available_usd" numeric(38,18) NOT NULL,
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "ai_balance_history" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL REFERENCES "ai_accounts"("id") ON DELETE CASCADE,
  "equity_usd" numeric(38,18) NOT NULL,
  "available_usd" numeric(38,18) NOT NULL,
  "pnl_realized" numeric(38,18) NOT NULL DEFAULT 0,
  "pnl_unrealized" numeric(38,18) NOT NULL DEFAULT 0,
  "sharpe" numeric(18,8),
  "created_at" timestamptz NOT NULL DEFAULT now()
);

-- Positions & Orders
CREATE TABLE "positions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL REFERENCES "ai_accounts"("id") ON DELETE CASCADE,
  "symbol" text NOT NULL,
  "side" text NOT NULL CHECK ("side" IN ('long','short')),
  "quantity" numeric(38,18) NOT NULL,
  "entry_price" numeric(38,18) NOT NULL,
  "liq_price" numeric(38,18),
  "leverage" numeric(18,8),
  "exit_plan" jsonb,
  "opened_at" timestamptz NOT NULL,
  "closed_at" timestamptz,
  "status" text NOT NULL CHECK ("status" IN ('open','closed')) DEFAULT 'open',
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX "positions_idx" ON "positions" ("account_id","symbol","status");

CREATE TABLE "orders" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL REFERENCES "ai_accounts"("id") ON DELETE CASCADE,
  "ext_order_id" text,
  "symbol" text NOT NULL,
  "side" text NOT NULL CHECK ("side" IN ('buy','sell')),
  "order_type" text NOT NULL CHECK ("order_type" IN ('market','limit','reduce_only','tp','sl')),
  "qty" numeric(38,18) NOT NULL,
  "price" numeric(38,18),
  "status" text NOT NULL CHECK ("status" IN ('created','filled','part_filled','cancelled','rejected')),
  "realized_pnl" numeric(38,18) NOT NULL DEFAULT 0,
  "meta" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX "orders_idx" ON "orders" ("account_id","symbol","created_at" DESC);

-- AI Runs & Decisions
CREATE TABLE "ai_runs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "agent_id" uuid NOT NULL REFERENCES "ai_agents"("id") ON DELETE CASCADE,
  "run_at" timestamptz NOT NULL DEFAULT now(),
  "user_prompt" jsonb NOT NULL,
  "analysis_summary" text,
  "provider_raw" jsonb,
  "latency_ms" int,
  "tokens_input" int,
  "tokens_output" int
);

CREATE TABLE "ai_decisions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "run_id" uuid NOT NULL REFERENCES "ai_runs"("id") ON DELETE CASCADE,
  "symbol" text NOT NULL,
  "action" text NOT NULL CHECK ("action" IN ('HOLD','BUY','SELL','NONE')),
  "confidence" numeric(9,4),
  "quantity" numeric(38,18),
  "reason_short" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  UNIQUE ("run_id","symbol")
);

-- Aggregations
CREATE TABLE "ai_metrics_daily" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "agent_id" uuid NOT NULL REFERENCES "ai_agents"("id") ON DELETE CASCADE,
  "day" date NOT NULL,
  "trades_count" int NOT NULL DEFAULT 0,
  "gross_volume_usd" numeric(38,18) NOT NULL DEFAULT 0,
  "net_pnl_usd" numeric(38,18) NOT NULL DEFAULT 0,
  "max_drawdown_usd" numeric(38,18),
  "max_profit_usd" numeric(38,18),
  "invocations" int NOT NULL DEFAULT 0,
  "runtime_minutes" int NOT NULL DEFAULT 0,
  UNIQUE ("agent_id","day")
);

-- Errors & Logging
CREATE TABLE "errors" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "scope" text NOT NULL,
  "ref_id" uuid,
  "message" text NOT NULL,
  "detail" jsonb,
  "occurred_at" timestamptz NOT NULL DEFAULT now()
);
