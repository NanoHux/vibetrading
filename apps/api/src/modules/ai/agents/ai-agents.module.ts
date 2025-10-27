import { Module } from '@nestjs/common';
import { AiAgentsController } from './ai-agents.controller';
import { AiAgentsService } from './ai-agents.service';

@Module({
  controllers: [AiAgentsController],
  providers: [AiAgentsService],
  exports: [AiAgentsService],
})
export class AiAgentsModule {}
