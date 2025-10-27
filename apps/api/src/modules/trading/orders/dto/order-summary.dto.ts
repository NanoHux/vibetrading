export class OrderSummaryDto {
  id!: string;
  symbol!: string;
  side!: 'buy' | 'sell';
  orderType!: 'market' | 'limit' | 'reduce_only' | 'tp' | 'sl';
  qty!: string;
  price?: string;
  status!: 'created' | 'filled' | 'part_filled' | 'cancelled' | 'rejected';
  realizedPnl!: string;
  createdAt!: string;
}
