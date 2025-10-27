import { Controller, Get, Param } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { AiMetricDailyDto } from './dto/ai-metric-daily.dto';

@Controller('metrics/agents/:id')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('daily')
  listDailyMetrics(@Param('id') agentId: string): AiMetricDailyDto[] {
    return this.metricsService.listDailyMetrics(agentId);
  }
}
