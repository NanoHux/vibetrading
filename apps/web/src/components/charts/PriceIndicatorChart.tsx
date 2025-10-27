import { ChartPlaceholder } from './ChartPlaceholder';

interface PriceIndicatorChartProps {
  symbol: string;
  timeframe: string;
  indicators: string[];
}

export function PriceIndicatorChart({ symbol, timeframe, indicators }: PriceIndicatorChartProps) {
  const subtitle = ${symbol} ¡¤  ¡¤ ;
  return <ChartPlaceholder title="Price & Indicators" subtitle={subtitle} height={320} />;
}
