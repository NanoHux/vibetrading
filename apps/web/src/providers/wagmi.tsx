import { PropsWithChildren, useMemo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { http, createConfig, WagmiProvider as CoreWagmiProvider } from 'wagmi';
import { base } from 'viem/chains';
import { walletConnect, metaMask } from 'wagmi/connectors';
import { createQueryClient } from './queryClient';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? 'demo-project-id';
const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Vibe Trading',
        url: window.location.origin,
      },
    }),
    walletConnect({
      projectId,
      metadata: {
        name: 'Vibe Trading',
        description: 'AI-assisted trading on Hyperliquid with Base wallet flows',
        url: window.location.origin,
        icons: [new URL('/vite.svg', window.location.origin).toString()],
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: false,
});

export function WagmiProvider({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => createQueryClient(), []);

  return (
    <CoreWagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CoreWagmiProvider>
  );
}

export const API_BASE_URL = apiBase;
