import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/state/auth.store';
import { Button } from '@/components/ui/Button';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/agents', label: 'AI Agents' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/metrics', label: 'Metrics' },
];

export function AppLayout() {
  const { status, address, authenticate } = useAuthStore();

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="app-shell__brand">Vibe Trading</div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="app-shell__content space-y-8">
        <header className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-50">Control Center</h1>
            <p className="text-sm text-slate-400">Monitor AI trading agents, balances, and market signals.</p>
          </div>
          <div className="flex items-center gap-3">
            {status === 'authenticated' && address ? (
              <span className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            ) : (
              <Button variant="secondary" onClick={authenticate}>
                Sign In with Ethereum
              </Button>
            )}
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
