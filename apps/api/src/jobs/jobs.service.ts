import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  // TODO: expose helpers for enqueuing jobs (market pulls, AI runs, metrics aggregation).
  enqueueMarketPull(symbol: string) {
    return { symbol, queued: true };
  }

  enqueueAiRun(agentId: string) {
    return { agentId, queued: true };
  }
}
