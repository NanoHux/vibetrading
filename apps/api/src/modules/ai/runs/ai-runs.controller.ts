import { Controller, Get, Param } from '@nestjs/common';
import { AiRunsService } from './ai-runs.service';

@Controller('ai/runs')
export class AiRunsController {
  constructor(private readonly runsService: AiRunsService) {}

  @Get(':id')
  getRun(@Param('id') id: string) {
    return this.runsService.getRun(id);
  }
}
