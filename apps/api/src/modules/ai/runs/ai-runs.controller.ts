import { Controller, Get, Param } from '@nestjs/common';
import { AiRunsService } from './ai-runs.service';
import { AiRunDto } from './dto/ai-run.dto';

@Controller('ai/runs')
export class AiRunsController {
  constructor(private readonly runsService: AiRunsService) {}

  @Get(':id')
  getRun(@Param('id') id: string): AiRunDto {
    return this.runsService.getRun(id);
  }
}
