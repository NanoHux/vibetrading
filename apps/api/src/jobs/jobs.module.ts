import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MarketIngestProcessor } from './processors/market-ingest.processor';
import { AiRunProcessor } from './processors/ai-run.processor';

@Module({
  providers: [JobsService, MarketIngestProcessor, AiRunProcessor],
  exports: [JobsService],
})
export class JobsModule {}
