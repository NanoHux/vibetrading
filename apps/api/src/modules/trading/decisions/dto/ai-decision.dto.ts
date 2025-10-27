export class AiDecisionDto {
  runId!: string;
  symbol!: string;
  action!: 'HOLD' | 'BUY' | 'SELL' | 'NONE';
  confidence?: number;
  quantity?: string;
  reasonShort?: string;
  createdAt!: string;
}
