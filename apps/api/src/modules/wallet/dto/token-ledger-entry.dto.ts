export class TokenLedgerEntryDto {
  id!: string;
  reason!: 'deposit_reward' | 'order_fee' | 'manual_adjust';
  amount!: string;
  balanceAfter!: string;
  createdAt!: string;
  refId?: string;
}
