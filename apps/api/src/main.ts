import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './infra/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // TODO: add session middleware, SIWE guards, rate limiting, and OpenAPI setup.
  const config = app.get(AppConfigService);
  const port = config.port;

  await app.listen(port);
  console.log(`API listening on port ${port}`);
}

bootstrap().catch((error) => {
  // Centralized logging will be wired into infra/logger soon.
  console.error('API bootstrap failed', error);
  process.exit(1);
});
