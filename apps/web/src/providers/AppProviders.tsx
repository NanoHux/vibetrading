import { PropsWithChildren } from 'react';
import { WagmiProvider } from './wagmi';

export function AppProviders({ children }: PropsWithChildren) {
  return <WagmiProvider>{children}</WagmiProvider>;
}
