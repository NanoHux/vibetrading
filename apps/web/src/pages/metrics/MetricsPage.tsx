import { useEffect } from 'react';
import { useMetricsStore } from '@/state/metrics.store';
import { useAgentsStore } from '@/state/agents.store';

export function MetricsPage() {
  const { selectedAgentId, agents, setSelectedAgent } = useAgentsStore();
  const { dailyMetrics, loadMetrics } = useMetricsStore();

  useEffect(() => {
    if (selectedAgentId) {
      loadMetrics(selectedAgentId);
    }
  }, [selectedAgentId, loadMetrics]);

  return (
    <section>
      <header>
        <h2>Performance Metrics</h2>
        <p>Day-level KPIs aggregated from ai_metrics_daily & balance history.</p>
      </header>
      <label>
        Agent
        <select
          value={selectedAgentId ?? ''}
          onChange={(event) => setSelectedAgent(event.target.value)}
        >
          <option value="">Select agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {dailyMetrics.map((metric) => (
          <li key={metric.day}>
            <strong>{metric.day}</strong> — PnL: {metric.netPnlUsd} — Trades: {metric.tradesCount}
          </li>
        ))}
      </ul>
    </section>
  );
}
