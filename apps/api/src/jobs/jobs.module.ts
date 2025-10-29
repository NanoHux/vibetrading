import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { MarketIngestProcessor } from './processors/market-ingest.processor.js';
import { AiRunProcessor } from './processors/ai-run.processor.js';

@Module({
  providers: [JobsService, MarketIngestProcessor, AiRunProcessor],
  exports: [JobsService],
})
export class JobsModule {}
