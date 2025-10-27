import { ChartPlaceholder } from './ChartPlaceholder';

interface MetricSparklineProps {
  title: string;
  metric: string;
}

export function MetricSparkline({ title, metric }: MetricSparklineProps) {
  return <ChartPlaceholder title={title} subtitle={metric} height={180} />;
}
