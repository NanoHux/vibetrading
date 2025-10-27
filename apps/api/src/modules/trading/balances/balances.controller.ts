import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';

@Controller('ai/agents/:id/balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  listBalances(@Param('id') agentId: string) {
    return this.balancesService.listAgentBalances(agentId);
  }
}
