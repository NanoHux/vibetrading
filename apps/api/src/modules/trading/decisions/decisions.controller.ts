import { Controller, Get, Param, Query } from '@nestjs/common';
import { DecisionsService } from './decisions.service';
import { AiDecisionDto } from './dto/ai-decision.dto';
import { AiMetricDailyDto } from './dto/ai-metric-daily.dto';

@Controller('ai/agents/:id/decisions')
export class DecisionsController {
  constructor(private readonly decisionsService: DecisionsService) {}

  @Get()
  listDecisions(
    @Param('id') agentId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): AiDecisionDto[] {
    return this.decisionsService.listDecisions(agentId, from, to);
  }
}
