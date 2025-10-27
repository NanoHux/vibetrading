import { Controller, Get, Param, Post } from '@nestjs/common';
import { AiAgentsService } from './ai-agents.service';

@Controller('ai/agents')
export class AiAgentsController {
  constructor(private readonly agentsService: AiAgentsService) {}

  @Get()
  listAgents() {
    return this.agentsService.listAgents();
  }

  @Post()
  createAgent() {
    return this.agentsService.createAgent();
  }

  @Post(':id/run')
  triggerRun(@Param('id') id: string) {
    return this.agentsService.triggerRun(id);
  }
}
