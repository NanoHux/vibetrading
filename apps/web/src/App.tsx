import { useEffect } from 'react';

// Placeholder layout until views are implemented.
export function App() {
  useEffect(() => {
    // Warm up logic for Zustand stores, SIWE session checks, etc.
  }, []);

  return (
    <div>
      <header>
        <h1>Vibe Trading Control Center</h1>
        <p>Connect wallet, manage AI agents, monitor Hyperliquid metrics.</p>
      </header>
      <main>
        <p>Routes, dashboards, and trading controls will live here.</p>
      </main>
    </div>
  );
}
