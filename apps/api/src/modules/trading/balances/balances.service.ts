import { Injectable } from '@nestjs/common';
import { AiBalanceDto } from './dto/ai-balance.dto';

@Injectable()
export class BalancesService {
  listAgentBalances(agentId: string): AiBalanceDto[] {
    // TODO: aggregate ai_balance and ai_balance_history for the agent.
    return [
      {
        accountId: 'account-demo',
        agentId,
        exchange: 'hyperliquid',
        equityUsd: '12500.45',
        availableUsd: '8400.12',
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}
