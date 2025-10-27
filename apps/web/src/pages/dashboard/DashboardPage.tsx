import { useEffect } from 'react';
import { useMarketStore } from '@/state/market.store';
import { useAgentsStore } from '@/state/agents.store';

export function DashboardPage() {
  const { selectedAgentId, agents, loadAgents } = useAgentsStore();
  const { snapshots, loadSnapshots } = useMarketStore();

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  useEffect(() => {
    if (selectedAgentId) {
      loadSnapshots(selectedAgentId);
    }
  }, [selectedAgentId, loadSnapshots]);

  return (
    <section>
      <header>
        <h2>Control Center</h2>
        <p>Overview of AI agent performance, balances, and market signals.</p>
      </header>
      <div>
        <p>Active agents: {agents.length}</p>
        <p>Snapshots cached: {snapshots.length}</p>
      </div>
    </section>
  );
}
