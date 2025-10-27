export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/vibe',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  hyperliquid: {
    apiBase: process.env.HYPERLIQUID_API_BASE ?? 'https://api.hyperliquid.xyz',
  },
});
