import { Injectable } from '@nestjs/common';

@Injectable()
export class DecisionsService {
  listDecisions(agentId: string, from?: string, to?: string) {
    // TODO: fetch ai_decisions joined with runs within provided range.
    return { agentId, from, to, decisions: [] };
  }
}
