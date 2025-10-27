import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';

interface Agent {
  id: string;
  name: string;
  model: string;
  provider: string;
}

interface AgentsState {
  agents: Agent[];
  selectedAgentId?: string;
  loadAgents: () => Promise<void>;
  setSelectedAgent: (id: string) => void;
  triggerAgentRun: (id: string) => Promise<void>;
}

export const useAgentsStore = create<AgentsState>((set, get) => ({
  agents: [],
  selectedAgentId: undefined,
  async loadAgents() {
    const agents = await apiClient<Agent[]>('/ai/agents');
    set((state) => ({
      agents,
      selectedAgentId: state.selectedAgentId ?? agents[0]?.id,
    }));
  },
  setSelectedAgent(id) {
    set({ selectedAgentId: id || undefined });
  },
  async triggerAgentRun(id) {
    await apiClient(`/ai/agents/${id}/run`, { method: 'POST' });
    // TODO: refetch decisions or show toast once backend returns run metadata.
    if (!get().selectedAgentId) {
      set({ selectedAgentId: id });
    }
  },
}));
