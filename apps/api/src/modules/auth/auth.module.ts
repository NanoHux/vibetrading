import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../infra/config/config.module.js';
import { PrismaModule } from '../../infra/prisma/prisma.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { SiweAuthGuard } from './guards/siwe-auth.guard.js';

@Module({
  imports: [AppConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, SiweAuthGuard],
  exports: [AuthService, SiweAuthGuard],
})
export class AuthModule {}
