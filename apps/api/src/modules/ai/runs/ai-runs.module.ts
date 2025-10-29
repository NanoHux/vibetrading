import { Module } from '@nestjs/common';
import { AiRunsService } from './ai-runs.service.js';
import { AiRunsController } from './ai-runs.controller.js';

@Module({
  controllers: [AiRunsController],
  providers: [AiRunsService],
  exports: [AiRunsService],
})
export class AiRunsModule {}
