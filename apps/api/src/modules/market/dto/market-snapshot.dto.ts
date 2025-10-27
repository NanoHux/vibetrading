export class MarketSnapshotDto {
  id!: string;
  symbol!: string;
  timeframe!: string;
  snapshotAt!: string;
  price!: string;
  indicators!: {
    ema20?: string;
    ema50?: string;
    macd?: string;
    rsi7?: string;
    rsi14?: string;
    atr14?: string;
  };
  oiFunding?: Record<string, unknown>;
}
