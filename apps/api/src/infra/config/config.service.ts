import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  port: number;
  databaseUrl: string;
  redisUrl: string;
  hyperliquid: {
    apiBase: string;
  };
}

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  get port() {
    return this.configService.get<number>('port', { infer: true });
  }

  get databaseUrl() {
    return this.configService.get<string>('databaseUrl', { infer: true });
  }

  get redisUrl() {
    return this.configService.get<string>('redisUrl', { infer: true });
  }

  get hyperliquidApiBase() {
    return this.configService.get<string>('hyperliquid.apiBase', { infer: true });
  }
}
