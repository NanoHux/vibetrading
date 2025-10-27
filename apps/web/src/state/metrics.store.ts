import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { AiMetricDaily } from '@/services/types';

interface MetricsState {
  dailyMetrics: AiMetricDaily[];
  loadMetrics: (agentId: string) => Promise<void>;
}

export const useMetricsStore = create<MetricsState>((set) => ({
  dailyMetrics: [],
  async loadMetrics(agentId: string) {
    if (!agentId) {
      set({ dailyMetrics: [] });
      return;
    }

    const metrics = await apiClient<AiMetricDaily[]>(`/metrics/agents/${agentId}/daily`);
    set({ dailyMetrics: metrics });
  },
}));
