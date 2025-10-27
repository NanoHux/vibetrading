import { create } from 'zustand';
import { apiClient } from '@/services/apiClient';
import { TokenLedgerEntry, UserBalanceSummary } from '@/services/types';

interface WalletState {
  balance: UserBalanceSummary;
  ledger: TokenLedgerEntry[];
  loadWallet: () => Promise<void>;
}

const defaultBalance: UserBalanceSummary = {
  tokenBalance: 0,
  equityUsd: 0,
  totalDepositsUsd: 0,
};

export const useWalletStore = create<WalletState>((set) => ({
  balance: defaultBalance,
  ledger: [],
  async loadWallet() {
    const [balance, ledger] = await Promise.all([
      apiClient<UserBalanceSummary>('/users/me/balance'),
      apiClient<TokenLedgerEntry[]>('/wallet/token-ledger'),
    ]);
    set({ balance, ledger });
  },
}));
