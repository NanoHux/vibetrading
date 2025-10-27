export class AiMetricDailyDto {
  day!: string;
  tradesCount!: number;
  grossVolumeUsd!: string;
  netPnlUsd!: string;
  maxDrawdownUsd?: string;
  maxProfitUsd?: string;
  invocations!: number;
  runtimeMinutes!: number;
}
