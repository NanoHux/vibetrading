export class PositionSummaryDto {
  id!: string;
  symbol!: string;
  side!: 'long' | 'short';
  quantity!: string;
  entryPrice!: string;
  status!: 'open' | 'closed';
  openedAt!: string;
  closedAt?: string;
  leverage?: string;
  unrealizedPnlUsd?: string;
}
