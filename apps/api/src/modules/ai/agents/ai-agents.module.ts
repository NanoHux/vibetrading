import { Module } from '@nestjs/common';
import { AiAgentsController } from './ai-agents.controller.js';
import { AiAgentsService } from './ai-agents.service.js';

@Module({
  controllers: [AiAgentsController],
  providers: [AiAgentsService],
  exports: [AiAgentsService],
})
export class AiAgentsModule {}
