import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  port: number;
  databaseUrl: string;
  redisUrl: string;
  hyperliquid: {
    apiBase: string;
  };
  auth: {
    allowedDomains: string[];
    session: {
      cookieName: string;
      ttlMs: number;
      secret: string;
      sameSite: 'lax' | 'strict' | 'none';
      secure: boolean;
      domain?: string;
    };
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

  get siweAllowedDomains() {
    const domains = this.configService.get<string[] | string>('auth.allowedDomains', { infer: true });
    if (Array.isArray(domains)) {
      return domains;
    }
    if (typeof domains === 'string') {
      return domains
        .split(',')
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
    }
    return [];
  }

  get sessionCookieName() {
    return this.configService.get<string>('auth.session.cookieName', { infer: true });
  }

  get sessionSecret() {
    return this.configService.get<string>('auth.session.secret', { infer: true });
  }

  get sessionTtlMs() {
    return this.configService.get<number>('auth.session.ttlMs', { infer: true });
  }

  get sessionSameSitePolicy() {
    return this.configService.get<'lax' | 'strict' | 'none'>('auth.session.sameSite', { infer: true });
  }

  get sessionCookieSecure() {
    return this.configService.get<boolean>('auth.session.secure', { infer: true });
  }

  get sessionCookieDomain() {
    return this.configService.get<string | undefined>('auth.session.domain', { infer: true });
  }
}
