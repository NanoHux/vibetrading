import { Injectable } from '@nestjs/common';
import { AiMetricDailyDto } from './dto/ai-metric-daily.dto';

@Injectable()
export class MetricsService {
  listDailyMetrics(agentId: string): AiMetricDailyDto[] {
    const baseDate = new Date();
    return Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(baseDate);
      day.setDate(day.getDate() - index);
      return {
        day: day.toISOString().substring(0, 10),
        tradesCount: Math.floor(Math.random() * 5),
        grossVolumeUsd: (Math.random() * 50000).toFixed(2),
        netPnlUsd: (Math.random() * 2000 - 1000).toFixed(2),
        maxDrawdownUsd: (Math.random() * 500).toFixed(2),
        maxProfitUsd: (Math.random() * 800).toFixed(2),
        invocations: Math.floor(Math.random() * 10),
        runtimeMinutes: Math.floor(Math.random() * 60),
      };
    });
  }
}
