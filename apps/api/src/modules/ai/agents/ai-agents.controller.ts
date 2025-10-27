import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AiAgentsService } from './ai-agents.service';
import { AiAgentDto } from './dto/ai-agent.dto';
import { CreateAiAgentDto } from './dto/create-ai-agent.dto';
import { AiAgentRunResponseDto } from './dto/ai-agent-run-response.dto';

@Controller('ai/agents')
export class AiAgentsController {
  constructor(private readonly agentsService: AiAgentsService) {}

  @Get()
  listAgents(): AiAgentDto[] {
    return this.agentsService.listAgents();
  }

  @Post()
  createAgent(@Body() payload: CreateAiAgentDto): AiAgentDto {
    return this.agentsService.createAgent(payload);
  }

  @Post(':id/run')
  triggerRun(@Param('id') id: string): AiAgentRunResponseDto {
    return this.agentsService.triggerRun(id);
  }
}
