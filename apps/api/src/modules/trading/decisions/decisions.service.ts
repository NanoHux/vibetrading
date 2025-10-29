import { Injectable } from '@nestjs/common';
import { AiDecisionDto } from './dto/ai-decision.dto.js';

@Injectable()
export class DecisionsService {
  listDecisions(agentId: string, from?: string, to?: string): AiDecisionDto[] {
    // TODO: fetch ai_decisions joined with runs within provided range.
    const now = Date.now();
    const decisions: AiDecisionDto[] = [
      {
        runId: `${agentId}-run-${now}`,
        symbol: 'BTC',
        action: 'BUY',
        confidence: 0.76,
        quantity: '0.25',
        reasonShort: 'Momentum breakout',
        createdAt: new Date(now).toISOString(),
      },
      {
        runId: `${agentId}-run-${now - 3600000}`,
        symbol: 'ETH',
        action: 'HOLD',
        createdAt: new Date(now - 3600000).toISOString(),
      },
    ];

    return decisions.filter((decision) => {
      if (from && new Date(decision.createdAt) < new Date(from)) {
        return false;
      }
      if (to && new Date(decision.createdAt) > new Date(to)) {
        return false;
      }
      return true;
    });
  }
}
