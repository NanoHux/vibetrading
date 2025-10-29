export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/vibe',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  hyperliquid: {
    apiBase: process.env.HYPERLIQUID_API_BASE ?? 'https://api.hyperliquid.xyz',
  },
  auth: {
    allowedDomains: (process.env.AUTH_ALLOWED_DOMAINS ?? 'localhost,vibetrading.xyz')
      .split(',')
      .map((domain) => domain.trim())
      .filter((domain) => domain.length > 0),
    session: {
      cookieName: process.env.AUTH_SESSION_COOKIE_NAME ?? 'vibe.sid',
      ttlMs: parseInt(process.env.AUTH_SESSION_TTL_MS ?? `${24 * 60 * 60 * 1000}`, 10),
      secret: process.env.AUTH_SESSION_SECRET ?? 'change-me-in-production',
      sameSite: (process.env.AUTH_SESSION_SAME_SITE ?? 'lax') as 'lax' | 'strict' | 'none',
      secure: process.env.AUTH_SESSION_SECURE === 'true',
      domain: process.env.AUTH_SESSION_COOKIE_DOMAIN,
    },
  },
});
