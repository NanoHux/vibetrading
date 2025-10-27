import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/hooks': path.resolve(__dirname, 'src/hooks'),
        '@/routes': path.resolve(__dirname, 'src/routes'),
        '@/state': path.resolve(__dirname, 'src/state'),
        '@/services': path.resolve(__dirname, 'src/services'),
        '@/providers': path.resolve(__dirname, 'src/providers'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV ?? mode),
    },
    server: {
      port: Number(env.WEB_PORT ?? 5173),
      proxy: {
        '/api': {
          target: env.API_BASE_URL ?? 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      include: ['wagmi', 'viem', '@tanstack/react-query'],
    },
  };
});
