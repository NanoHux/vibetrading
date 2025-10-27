import { Injectable } from '@nestjs/common';

@Injectable()
export class BalancesService {
  listAgentBalances(agentId: string) {
    // TODO: aggregate ai_balance and ai_balance_history for the agent.
    return { agentId, balances: [] };
  }
}
