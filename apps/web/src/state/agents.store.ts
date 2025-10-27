import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { AiAgentSummary, AiAgentRunResponse } from '@/services/types';

interface AgentsState {
  agents: AiAgentSummary[];
  selectedAgentId?: string;
  loadAgents: () => Promise<void>;
  setSelectedAgent: (id: string) => void;
  triggerAgentRun: (id: string) => Promise<AiAgentRunResponse>;
}

export const useAgentsStore = create<AgentsState>((set, get) => ({
  agents: [],
  selectedAgentId: undefined,
  async loadAgents() {
    const agents = await apiClient<AiAgentSummary[]>('/ai/agents');
    set((state) => ({
      agents,
      selectedAgentId: state.selectedAgentId ?? agents[0]?.id,
    }));
  },
  setSelectedAgent(id) {
    set({ selectedAgentId: id || undefined });
  },
  async triggerAgentRun(id) {
    const response = await apiClient<AiAgentRunResponse>(`/ai/agents/${id}/run`, { method: 'POST' });
    if (!get().selectedAgentId) {
      set({ selectedAgentId: id });
    }
    return response;
  },
}));
