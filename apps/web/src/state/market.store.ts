import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';

interface MarketSnapshot {
  id: string;
  symbol: string;
  timeframe: string;
  snapshot_at: string;
  current: Record<string, unknown>;
}

interface MarketState {
  snapshots: MarketSnapshot[];
  loadSnapshots: (agentId: string) => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  snapshots: [],
  async loadSnapshots(agentId: string) {
    // TODO: backend endpoint may accept agent-specific parameters (e.g., symbol/timeframe preferences).
    const data = await apiClient<MarketSnapshot[]>(`/market/snapshots?limit=5`);
    set({ snapshots: data });
  },
}));
