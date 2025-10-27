import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';

interface DailyMetric {
  day: string;
  netPnlUsd: string;
  tradesCount: number;
  grossVolumeUsd: string;
  maxDrawdownUsd?: string;
  maxProfitUsd?: string;
}

interface MetricsState {
  dailyMetrics: DailyMetric[];
  loadMetrics: (agentId: string) => Promise<void>;
}

export const useMetricsStore = create<MetricsState>((set) => ({
  dailyMetrics: [],
  async loadMetrics(agentId: string) {
    if (!agentId) {
      set({ dailyMetrics: [] });
      return;
    }

    const metrics = await apiClient<DailyMetric[]>(`/metrics/agents/${agentId}/daily`);
    set({ dailyMetrics: metrics });
  },
}));
