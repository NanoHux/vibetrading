import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('market-ingest')
export class MarketIngestProcessor {
  @Process()
  async handle(job: Job<{ symbol: string }>) {
    // TODO: call Hyperliquid service, compute indicators, persist market snapshot.
    return { symbol: job.data.symbol };
  }
}
