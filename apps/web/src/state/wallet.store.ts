import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';

interface WalletBalance {
  token: number;
  equityUsd: number;
}

interface LedgerEntry {
  id: string;
  reason: string;
  amount: string;
  createdAt: string;
}

interface WalletState {
  balance: WalletBalance;
  ledger: LedgerEntry[];
  loadWallet: () => Promise<void>;
}

const defaultBalance: WalletBalance = {
  token: 0,
  equityUsd: 0,
};

export const useWalletStore = create<WalletState>((set) => ({
  balance: defaultBalance,
  ledger: [],
  async loadWallet() {
    const [balance, ledger] = await Promise.all([
      apiClient<WalletBalance>('/users/me/balance'),
      apiClient<LedgerEntry[]>('/wallet/token-ledger'),
    ]);
    set({ balance, ledger });
  },
}));
