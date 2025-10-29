# Vibe Trading Platform

Vibe Trading is an AI-assisted crypto trading platform that unifies wallet-based authentication, deposit handling, multi-provider AI strategy execution, and Hyperliquid market connectivity. This repository hosts the monorepo layout for both the web client and the NestJS API service.

## Repository Layout

```
/apps
  /web                 React + Vite front-end
  /api                 NestJS back-end
    /src
      /modules
        /auth         SIWE login, session/token issuance
        /users        Profile & preferences
        /wallet       x402 Base USDC deposits, in-app token ledger
          /x402       Coinbase x402 integration surface
        /ai
          /providers  Provider adapters (DeepSeek, OpenAI, Gemini, Grok…)
          /agents     AI instances (key + prompt binding)
          /prompts    Prompt templates & versioning
          /runs       Invocation lifecycle and decision capture
        /market
          /hyperliquid Hyperliquid pullers, indicators, snapshots
        /trading
          /positions  Position state management
          /orders     Order routing & reconciliation
          /decisions  Parsed AI decisions -> trade plans
          /balances   Account equity & history
        /webhooks     On-chain / third-party callbacks
        /errors       Error logging & audit trail writers
      /jobs            BullMQ processors (market ingest, AI runs, metrics)
      /lib             Shared indicator/math/util libraries
      /infra           Prisma, Redis, configuration, observability
      main.ts          API bootstrap
/prisma/schema.prisma  Prisma entry point (raw SQL migrations stored separately)
```

## Front-end Architecture (`apps/web`)

- **Stack**: React 18, Vite, TypeScript, Zustand for lightweight state management, React Router for routing, wagmi + viem + WalletConnect v2 + MetaMask SDK for wallet connectivity.
- **Authentication**: SIWE (ERC-4361) flow powered by wagmi `siwe` helpers. The UI retrieves a nonce from `/auth/siwe/nonce`, signs via wallet, and verifies against `/auth/siwe/verify`. Session state is cached in Zustand and refreshed on reconnect.
- **Deposit UX**: When a protected API responds with HTTP 402, the client surfaces the Coinbase x402 payment modal. Users complete Base-chain USDC payments, and the UI polls `/users/me/balance` to reflect the on-chain confirmation and in-app token issuance.
- **Monitoring Surfaces**:
  - Agent selector (one agent per AI key + prompt pair).
  - Balance and performance KPIs (equity, realized PnL, win rate, drawdown, runtime).
  - Tables: Positions (with TP/SL/invalidation), Orders, AI Decisions.
  - Charts: Hyperliquid price streams with EMA/MACD/RSI overlays, equity curve, daily metrics rollups.
- **State Segmentation**: Zustand stores per concern (auth, agents, market, trading). React Query or custom hooks sit in `src/hooks` to wrap API access and caching.

## Back-end Architecture (`apps/api`)

- **Framework**: NestJS with module-per-domain layout and dependency injection.
- **Persistence**: PostgreSQL 15+ via Prisma. Numeric precision is standardized to `numeric(38,18)` for monetary and quantity fields. UUID primary keys and `timestamptz` timestamps ensure auditability.
- **Caching & Queueing**: Redis hosts sessions, rate limits, dedupe caches, and BullMQ job queues (market polling, AI invocations, metrics aggregation).
- **AI Adapter Layer**:
  - Provider-agnostic adapters in `modules/ai/providers` encapsulate DeepSeek, OpenAI, Gemini, Grok, etc.
  - Each API key maps to an `AI Agent` (unique key + prompt binding) to avoid cache pollution.
  - `modules/ai/runs` handles prompt composition (market snapshots + balance/position context), invocation, structured decision parsing, and persistence.
- **Market Pipeline**:
  - BullMQ jobs fetch Hyperliquid public API data every minute (price, OI, funding, volume).
  - Indicators (EMA, MACD, RSI, ATR) computed in `lib/indicators` using reusable math helpers.
  - Results stored in `market_snapshots` for prompt hydration and analytics.
- **Trading Execution**:
  - AI decisions in `ai_decisions` translate into actionable orders.
  - `modules/trading/orders` enforces client-side idempotency (client IDs), risk checks (exposure limits, leverage bounds), and exchange submission.
  - Position and balance updates persist to `positions`, `ai_balance`, `ai_balance_history`, plus daily rollups in `ai_metrics_daily`.
- **Wallet & Token Logic**:
  - SIWE guards wrap protected routes.
  - `/wallet/x402/prepare` generates price/nonce/integrity payloads for the client.
  - Webhooks validate x402 receipts, monitor Base-chain USDC confirmations, and credit in-app tokens at `1 USDC = 10,000` ratio until either the 1B token cap or 100,000 USDC aggregate ceiling is reached.
  - Token movements are captured in `token_ledger`, while `token_supply_guard` enforces supply caps.
- **Risk & Observability**:
  - Rate limiting and retry policies enforced via Redis.
  - Signed payload verification and replay attack prevention integrated into SIWE and webhook handling.
  - `modules/errors` writes structured audit logs for failures (AI parsing issues, wallet discrepancies, trading anomalies).

## Database Overview

Raw SQL DDL (see project documentation) defines the core tables:
- **Identity & Wallets**: `users`, `user_wallets`.
- **Deposits & Tokens**: `deposits`, `token_ledger`, `token_supply_guard`.
- **AI Layer**: `ai_providers`, `ai_api_keys`, `prompts`, `ai_agents`, `ai_runs`, `ai_decisions`, `ai_accounts`, `ai_balance`, `ai_balance_history`, `ai_metrics_daily`.
- **Market & Trading**: `market_snapshots`, `positions`, `orders`.
- **Supporting**: `errors`, plus future `webhooks`/`model_runs` storage.

All tables use UUID primary keys, store timestamps with timezone, and rely on unique constraints for idempotency (e.g., `tx_hash`, `(api_key_id, prompt_id)`, order indices). Prisma migrations will apply the SQL verbatim or translate it into Prisma models where appropriate.

## Key Workflows

1. **SIWE Authentication**
   - Client: fetch nonce → wallet `personal_sign` → submit signature.
   - Server: verify signature, issue session/JWT, cache session in Redis, enforce on all protected routes.

2. **Deposit & Token Issuance (x402 + Base USDC)**
   - Client: call `/wallet/x402/prepare`; if backend returns HTTP 402 on access, raise x402 payment window with `x-payment` headers.
   - Server: validate Coinbase x402 receipt, confirm on-chain transfer, credit in-app tokens (`USDC * 10,000`), update token supply guard, create `deposits` + `token_ledger` rows.
   - Guardrails: reject once cumulative USDC >= 100,000 or total distributed tokens >= 1,000,000,000.

3. **Market Data & Indicators**
   - Worker: poll Hyperliquid, compute EMA/MACD/RSI/ATR with historical context, store `market_snapshots`.
   - API: expose `GET /market/snapshots` for UI and AI prompt assembly.

4. **AI Decision Loop**
   - Trigger: manual UI action or scheduled BullMQ job -> `/ai/agents/:id/run`.
   - Backend: compose prompt from latest market + account state, call provider adapter, capture raw response, store `ai_runs` + structured `ai_decisions`.
   - Error Handling: if parsing fails, log to `errors`, mark run failed, skip trade execution.

5. **Trade Execution & Monitoring**
   - Orders persisted to `orders` with status transitions driven by exchange webhooks/polling.
   - Positions consolidated in `positions`; balances tracked via `ai_balance` and appended to `ai_balance_history`.
   - Daily metrics aggregated into `ai_metrics_daily` for dashboards and reporting.
