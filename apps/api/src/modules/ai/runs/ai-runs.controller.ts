import { Controller, Get, Param } from '@nestjs/common';
import { AiRunsService } from './ai-runs.service.js';
import { AiRunDto } from './dto/ai-run.dto.js';

@Controller('ai/runs')
export class AiRunsController {
  constructor(private readonly runsService: AiRunsService) {}

  @Get(':id')
  getRun(@Param('id') id: string): AiRunDto {
    return this.runsService.getRun(id);
  }
}
