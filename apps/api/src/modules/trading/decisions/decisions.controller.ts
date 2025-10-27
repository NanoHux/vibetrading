import { Controller, Get, Param, Query } from '@nestjs/common';
import { DecisionsService } from './decisions.service';

@Controller('ai/agents/:id/decisions')
export class DecisionsController {
  constructor(private readonly decisionsService: DecisionsService) {}

  @Get()
  listDecisions(
    @Param('id') agentId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.decisionsService.listDecisions(agentId, from, to);
  }
}
