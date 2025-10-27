import { useEffect } from 'react';
import { useWalletStore } from '@/state/wallet.store';

export function WalletPage() {
  const { balance, ledger, loadWallet } = useWalletStore();

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  return (
    <section>
      <header>
        <h2>Wallet & Deposits</h2>
        <p>Sign in with Ethereum, initiate x402 deposits, and review token grants.</p>
      </header>
      <div>
        <p>Token balance: {balance.token.toLocaleString()}</p>
        <p>Equity (USD): {balance.equityUsd.toLocaleString()}</p>
      </div>
      <h3>Recent Ledger Entries</h3>
      <ul>
        {ledger.map((entry) => (
          <li key={entry.id}>
            <span>{entry.reason}</span> — <span>{entry.amount}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
