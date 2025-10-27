export interface SiweNonceResponse {
  nonce: string;
}

export interface SiweVerifyResponse {
  verified: boolean;
  address?: string;
}

export interface UserProfile {
  id: string | null;
  email: string | null;
  displayName: string | null;
}

export interface UserBalanceSummary {
  tokenBalance: number;
  equityUsd: number;
  totalDepositsUsd: number;
}

export interface TokenLedgerEntry {
  id: string;
  reason: 'deposit_reward' | 'order_fee' | 'manual_adjust';
  amount: string;
  balanceAfter: string;
  createdAt: string;
  refId?: string;
}

export interface AiAgentSummary {
  id: string;
  name: string;
  model: string;
  provider: string;
  isActive: boolean;
  createdAt: string;
}

export interface AiAgentRunResponse {
  agentId: string;
  runId: string;
  status: 'queued' | 'started' | 'failed';
}

export interface MarketSnapshot {
  id: string;
  symbol: string;
  timeframe: string;
  snapshotAt: string;
  price: string;
  indicators: {
    ema20?: string;
    ema50?: string;
    macd?: string;
    rsi7?: string;
    rsi14?: string;
    atr14?: string;
  };
  oiFunding?: Record<string, unknown>;
}

export interface AiDecision {
  runId: string;
  symbol: string;
  action: 'HOLD' | 'BUY' | 'SELL' | 'NONE';
  confidence?: number;
  quantity?: string;
  reasonShort?: string;
  createdAt: string;
}

export interface AiBalanceSnapshot {
  accountId: string;
  agentId: string;
  exchange: string;
  equityUsd: string;
  availableUsd: string;
  updatedAt: string;
}

export interface OrderSummary {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'reduce_only' | 'tp' | 'sl';
  qty: string;
  price?: string;
  status: 'created' | 'filled' | 'part_filled' | 'cancelled' | 'rejected';
  realizedPnl: string;
  createdAt: string;
}

export interface PositionSummary {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  quantity: string;
  entryPrice: string;
  status: 'open' | 'closed';
  openedAt: string;
  closedAt?: string;
  leverage?: string;
  unrealizedPnlUsd?: string;
}

export interface AiMetricDaily {
  day: string;
  tradesCount: number;
  grossVolumeUsd: string;
  netPnlUsd: string;
  maxDrawdownUsd?: string;
  maxProfitUsd?: string;
  invocations: number;
  runtimeMinutes: number;
}
