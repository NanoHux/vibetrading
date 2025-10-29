import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { AppModule } from './app.module.js';
import { AppConfigService } from './infra/config/config.service.js';
import { RedisService } from './infra/redis/redis.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = app.get(AppConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  const redisService = app.get(RedisService);

  let redisStore: session.Store | undefined;
  try {
    const redisClient = await redisService.getClient();
    redisStore = new RedisStore({
      client: redisClient,
      prefix: 'sess:vibe:',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Redis session store unavailable, falling back to in-memory session store', error);
  }

  app.use(
    session({
      store: redisStore,
      secret: config.sessionSecret,
      name: config.sessionCookieName,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: config.sessionTtlMs,
        httpOnly: true,
        sameSite: config.sessionSameSitePolicy,
        secure: config.sessionCookieSecure,
        domain: config.sessionCookieDomain ?? undefined,
      },
    }),
  );

  // TODO: add rate limiting and OpenAPI setup.
  const port = config.port;

  await app.listen(port);
  console.log(`API listening on port ${port}`);
}

bootstrap().catch((error) => {
  // Centralized logging will be wired into infra/logger soon.
  console.error('API bootstrap failed', error);
  process.exit(1);
});
