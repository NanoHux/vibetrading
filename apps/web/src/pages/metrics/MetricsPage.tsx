import { useEffect } from 'react';
import { useMetricsStore } from '@/state/metrics.store';
import { useAgentsStore } from '@/state/agents.store';
import { ChartPlaceholder } from '@/components/charts/ChartPlaceholder';

export function MetricsPage() {
  const { selectedAgentId, agents, setSelectedAgent } = useAgentsStore();
  const { dailyMetrics, loadMetrics } = useMetricsStore();

  useEffect(() => {
    if (selectedAgentId) {
      loadMetrics(selectedAgentId).catch(() => undefined);
    }
  }, [selectedAgentId, loadMetrics]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="section-title">Performance Metrics</h2>
          <p className="text-sm text-slate-400">Day-level KPIs aggregated from ai_metrics_daily & balance history.</p>
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
      </header>

      <ChartPlaceholder title="Daily Metrics Heatmap" subtitle="Visualizations coming soon" height={260} />

      <div className="overflow-hidden rounded-2xl border border-white/5">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Day</th>
              <th className="px-4 py-3 text-left">PnL (USD)</th>
              <th className="px-4 py-3 text-left">Volume</th>
              <th className="px-4 py-3 text-left">Trades</th>
              <th className="px-4 py-3 text-left">Invocations</th>
              <th className="px-4 py-3 text-left">Runtime</th>
              <th className="px-4 py-3 text-left">Max DD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {dailyMetrics.map((metric) => (
              <tr key={metric.day} className="bg-[#111C30]/60 hover:bg-[#1E2742]/80">
                <td className="px-4 py-3 font-medium text-slate-200">{metric.day}</td>
                <td className="px-4 py-3 text-emerald-300">{metric.netPnlUsd}</td>
                <td className="px-4 py-3 text-slate-200">{metric.grossVolumeUsd}</td>
                <td className="px-4 py-3 text-slate-200">{metric.tradesCount}</td>
                <td className="px-4 py-3 text-slate-200">{metric.invocations}</td>
                <td className="px-4 py-3 text-slate-200">{metric.runtimeMinutes} mins</td>
                <td className="px-4 py-3 text-rose-300">{metric.maxDrawdownUsd ?? '--'}</td>
              </tr>
            ))}
            {dailyMetrics.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-slate-400">
                  Select an agent to view historical metrics.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
