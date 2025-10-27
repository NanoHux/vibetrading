import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { AgentsPage } from '@/pages/agents/AgentsPage';
import { WalletPage } from '@/pages/wallet/WalletPage';
import { MetricsPage } from '@/pages/metrics/MetricsPage';
import { LoginPage } from '@/pages/auth/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'agents',
        element: <AgentsPage />,
      },
      {
        path: 'wallet',
        element: <WalletPage />,
      },
      {
        path: 'metrics',
        element: <MetricsPage />,
      },
    ],
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
]);
