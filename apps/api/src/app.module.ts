import { Module } from '@nestjs/common';
import { AppConfigModule } from './infra/config/config.module.js';
import { PrismaModule } from './infra/prisma/prisma.module.js';
import { RedisModule } from './infra/redis/redis.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { WalletModule } from './modules/wallet/wallet.module.js';
import { AiModule } from './modules/ai/ai.module.js';
import { MarketModule } from './modules/market/market.module.js';
import { TradingModule } from './modules/trading/trading.module.js';
import { WebhooksModule } from './modules/webhooks/webhooks.module.js';
import { ErrorsModule } from './modules/errors/errors.module.js';
import { JobsModule } from './jobs/jobs.module.js';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    WalletModule,
    AiModule,
    MarketModule,
    TradingModule,
    WebhooksModule,
    ErrorsModule,
    JobsModule,
  ],
})
export class AppModule {}
