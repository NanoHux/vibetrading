import { create } from 'zustand';
import { getAccount } from '@wagmi/core';
import { siweSignIn } from '@/services/siwe';

type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated' | 'loading';

interface AuthState {
  status: AuthStatus;
  address?: string;
  authenticate: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  address: undefined,
  authenticate: async () => {
    set({ status: 'loading' });
    try {
      const { address, chainId } = getAccount();
      if (!address || !chainId) {
        throw new Error('Wallet not connected');
      }

      const { verified } = await siweSignIn(address, chainId);
      if (!verified) {
        throw new Error('SIWE verification failed');
      }

      set({ status: 'authenticated', address });
    } catch (error) {
      console.error('SIWE authentication failed', error);
      set({ status: 'unauthenticated', address: undefined });
    }
  },
  reset: () => set({ status: 'idle', address: undefined }),
}));
