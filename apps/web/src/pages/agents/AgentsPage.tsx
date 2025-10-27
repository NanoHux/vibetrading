import { useEffect } from 'react';
import { useAgentsStore } from '@/state/agents.store';

export function AgentsPage() {
  const { agents, loadAgents, triggerAgentRun } = useAgentsStore();

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  return (
    <section>
      <header>
        <h2>AI Agents</h2>
        <p>Manage provider bindings, prompts, and execution cadence.</p>
      </header>
      <ul>
        {agents.map((agent) => (
          <li key={agent.id}>
            <div>
              <strong>{agent.name}</strong> &mdash; {agent.model}
            </div>
            <button type="button" onClick={() => triggerAgentRun(agent.id)}>
              Trigger Run
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
