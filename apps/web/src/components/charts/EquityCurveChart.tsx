import { ChartPlaceholder } from './ChartPlaceholder';

interface EquityCurveChartProps {
  dataPoints: Array<{ timestamp: string; equityUsd: string }>;
}

export function EquityCurveChart({ dataPoints }: EquityCurveChartProps) {
  // TODO: replace placeholder with actual chart implementation.
  const latest = dataPoints.at(-1);
  const subtitle = latest ? Latest equity: {Number(latest.equityUsd).toLocaleString()} : undefined;

  return <ChartPlaceholder title="Equity Curve" subtitle={subtitle} height={280} />;
}
