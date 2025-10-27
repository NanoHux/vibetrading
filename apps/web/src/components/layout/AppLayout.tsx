import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/agents', label: 'AI Agents' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/metrics', label: 'Metrics' },
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="app-shell__brand">Vibe Trading</div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}

