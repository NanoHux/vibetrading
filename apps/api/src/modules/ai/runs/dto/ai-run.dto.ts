export class AiRunDto {
  id!: string;
  agentId!: string;
  runAt!: string;
  latencyMs?: number;
  tokensInput?: number;
  tokensOutput?: number;
  decisions!: Array<{
    symbol: string;
    action: 'HOLD' | 'BUY' | 'SELL' | 'NONE';
    confidence?: number;
    quantity?: string;
    reasonShort?: string;
  }>;
  analysisSummary?: string;
}
