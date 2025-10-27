import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { AiBalanceDto } from './dto/ai-balance.dto';

@Controller('ai/agents/:id/balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  listBalances(@Param('id') agentId: string): AiBalanceDto[] {
    return this.balancesService.listAgentBalances(agentId);
  }
}
