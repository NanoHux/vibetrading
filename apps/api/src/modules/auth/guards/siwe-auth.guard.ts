import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AppConfigService } from '../../../infra/config/config.service.js';

@Injectable()
export class SiweAuthGuard implements CanActivate {
  constructor(private readonly config: AppConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const session = request.session;

    if (!session?.siwe) {
      throw new UnauthorizedException('SIWE session required');
    }

    const expiresAt = session.siwe.expiresAt ? new Date(session.siwe.expiresAt).getTime() : undefined;
    if (expiresAt && expiresAt < Date.now()) {
      request.session.destroy(() => undefined);
      throw new UnauthorizedException('SIWE session expired');
    }

    request.siwe = session.siwe;
    return true;
  }
}
