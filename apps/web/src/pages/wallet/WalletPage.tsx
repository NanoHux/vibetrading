import { useEffect } from 'react';
import { useWalletStore } from '@/state/wallet.store';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/cards/StatCard';

const reasonLabels: Record<string, string> = {
  deposit_reward: 'Deposit Reward',
  order_fee: 'Order Fee',
  manual_adjust: 'Manual Adjustment',
};

export function WalletPage() {
  const { balance, ledger, loadWallet } = useWalletStore();

  useEffect(() => {
    loadWallet().catch(() => undefined);
  }, [loadWallet]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="section-title">Wallet & Deposits</h2>
          <p className="text-sm text-slate-400">
            x402-powered Base USDC deposits with automatic in-platform token issuance.
          </p>
        </div>
        <Button variant="primary">Deposit via x402</Button>
      </header>

      <div className="card-grid">
        <StatCard title="Token Balance" value={`${balance.tokenBalance.toLocaleString()} VBT`} />
        <StatCard title="Equity" value={`$${balance.equityUsd.toLocaleString()}`} />
        <StatCard title="Total Deposits" value={`$${balance.totalDepositsUsd.toLocaleString()}`} />
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#111C30]/70">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-100">Token Ledger</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">Latest activity</span>
        </div>
        <ul className="divide-y divide-white/5">
          {ledger.map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-sm font-medium text-slate-100">
                  {reasonLabels[entry.reason] ?? entry.reason}
                </p>
                <p className="text-xs text-slate-400">{new Date(entry.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-300">{entry.amount}</p>
                <p className="text-xs text-slate-400">Balance: {entry.balanceAfter}</p>
              </div>
            </li>
          ))}
          {ledger.length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-slate-400">No token ledger activity yet.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
