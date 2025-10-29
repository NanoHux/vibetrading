import { ChartPlaceholder } from './ChartPlaceholder';

interface PriceIndicatorChartProps {
  symbol: string;
  timeframe: string;
  indicators: string[];
}

export function PriceIndicatorChart({ symbol, timeframe, indicators }: PriceIndicatorChartProps) {
  const indicatorSummary = indicators.length ? indicators.join(', ') : 'No indicators';
  const subtitle = `${symbol} - ${timeframe} - ${indicatorSummary}`;
  return <ChartPlaceholder title="Price & Indicators" subtitle={subtitle} height={320} />;
}
