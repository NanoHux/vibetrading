import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

@Injectable()
export class MarketIngestProcessor {
  async handle(job: Job<{ symbol: string }>) {
    // TODO: call Hyperliquid service, compute indicators, persist market snapshot.
    return { symbol: job.data.symbol };
  }
}
