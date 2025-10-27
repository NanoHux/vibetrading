import { Module } from '@nestjs/common';
import { AiRunsService } from './ai-runs.service';
import { AiRunsController } from './ai-runs.controller';

@Module({
  controllers: [AiRunsController],
  providers: [AiRunsService],
  exports: [AiRunsService],
})
export class AiRunsModule {}
