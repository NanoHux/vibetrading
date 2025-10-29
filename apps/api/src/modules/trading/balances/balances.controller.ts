import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service.js';
import { AiBalanceDto } from './dto/ai-balance.dto.js';

@Controller('ai/agents/:id/balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  listBalances(@Param('id') agentId: string): AiBalanceDto[] {
    return this.balancesService.listAgentBalances(agentId);
  }
}
