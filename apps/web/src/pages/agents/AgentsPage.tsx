import { useEffect } from 'react';
import { useAgentsStore } from '@/state/agents.store';
import { Button } from '@/components/ui/Button';

export function AgentsPage() {
  const { agents, loadAgents, triggerAgentRun } = useAgentsStore();

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="section-title">AI Agent Directory</h2>
          <p className="text-sm text-slate-400">
            Manage provider bindings, prompts, and manual run triggers for your automated strategists.
          </p>
        </div>
        <Button variant="secondary">Add Agent</Button>
      </header>
      <div className="grid gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#111C30]/70 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-100">{agent.name}</h3>
              <p className="text-sm text-slate-400">
                {agent.provider} - {agent.model}
              </p>
              <p className="text-xs text-slate-500">Created {new Date(agent.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Active
              </span>
              <Button variant="primary" onClick={() => triggerAgentRun(agent.id)}>
                Trigger Run
              </Button>
            </div>
          </div>
        ))}
        {agents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-12 text-center text-slate-400">
            No agents yet. Connect a provider and prompt to start deploying AI traders.
          </div>
        )}
      </div>
    </section>
  );
}
