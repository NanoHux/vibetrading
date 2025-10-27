import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { MarketSnapshot } from '@/services/types';

interface MarketState {
  snapshots: MarketSnapshot[];
  loadSnapshots: (agentId?: string) => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  snapshots: [],
  async loadSnapshots(agentId) {
    const params = new URLSearchParams({ limit: '5' });
    if (agentId) {
      params.set('agentId', agentId);
    }

    const data = await apiClient<MarketSnapshot[]>(`/market/snapshots?${params.toString()}`);
    set({ snapshots: data });
  },
}));
