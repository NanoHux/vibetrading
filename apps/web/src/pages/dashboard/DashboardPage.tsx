import { useEffect, useMemo } from 'react';
import { useAgentsStore } from '@/state/agents.store';
import { useMarketStore } from '@/state/market.store';
import { useWalletStore } from '@/state/wallet.store';
import { useMetricsStore } from '@/state/metrics.store';
import { StatCard } from '@/components/cards/StatCard';
import { EquityCurveChart } from '@/components/charts/EquityCurveChart';
import { PriceIndicatorChart } from '@/components/charts/PriceIndicatorChart';
import { MetricSparkline } from '@/components/charts/MetricSparkline';

export function DashboardPage() {
  const { agents, selectedAgentId, loadAgents, setSelectedAgent } = useAgentsStore();
  const { snapshots, loadSnapshots } = useMarketStore();
  const { balance, loadWallet } = useWalletStore();
  const { dailyMetrics, loadMetrics } = useMetricsStore();

  useEffect(() => {
    loadAgents();
    loadWallet().catch(() => undefined);
  }, [loadAgents, loadWallet]);

  useEffect(() => {
    if (selectedAgentId) {
      loadSnapshots(selectedAgentId).catch(() => undefined);
      loadMetrics(selectedAgentId).catch(() => undefined);
    }
  }, [selectedAgentId, loadSnapshots, loadMetrics]);

  const latestSnapshot = snapshots.at(0);
  const lastMetric = dailyMetrics.at(0);

  const equitySeries = useMemo(
    () =>
      dailyMetrics
        .map((metric) => ({ timestamp: metric.day, equityUsd: metric.netPnlUsd }))
        .reverse(),
    [dailyMetrics],
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="section-title">Execution Overview</h2>
          <p className="text-sm text-slate-400">Key performance indicators for the selected AI agent.</p>
        </div>
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <span>Agent</span>
          <select
            className="rounded-xl border border-white/10 bg-[#111C30] px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
            value={selectedAgentId ?? ''}
            onChange={(event) => setSelectedAgent(event.target.value)}
          >
            <option value="">Select agent...</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card-grid">
        <StatCard
          title="Token Balance"
          value={`${balance.tokenBalance.toLocaleString()} TOK`}
          delta={{ value: '+12% weekly', trend: 'up' }}
        />
        <StatCard
          title="Equity (USD)"
          value={`$${balance.equityUsd.toLocaleString()}`}
          delta={{ value: `${lastMetric?.netPnlUsd ?? '0'} daily PnL`, trend: 'flat' }}
        />
        <StatCard
          title="Market Snapshot"
          value={latestSnapshot ? `$${Number(latestSnapshot.price).toLocaleString()}` : '--'}
          delta={{ value: `${latestSnapshot?.symbol ?? '--'} ¡¤ ${latestSnapshot?.timeframe ?? ''}`, trend: 'flat' }}
        />
        <StatCard
          title="Trades (24h)"
          value={lastMetric?.tradesCount ?? 0}
          delta={{ value: `${lastMetric?.grossVolumeUsd ?? '0'} USD volume`, trend: 'up' }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EquityCurveChart dataPoints={equitySeries} />
        </div>
        <MetricSparkline title="Runtime (mins)" metric={`${lastMetric?.runtimeMinutes ?? 0} mins`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PriceIndicatorChart
          symbol={latestSnapshot?.symbol ?? 'BTC'}
          timeframe={latestSnapshot?.timeframe ?? '1m'}
          indicators={['EMA20', 'MACD', 'RSI']}
        />
        <MetricSparkline title="Drawdown" metric={`$${lastMetric?.maxDrawdownUsd ?? '0'}`} />
      </div>
    </section>
  );
}
