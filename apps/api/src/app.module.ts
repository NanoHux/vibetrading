import { Module } from '@nestjs/common';
import { AppConfigModule } from './infra/config/config.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { RedisModule } from './infra/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { AiModule } from './modules/ai/ai.module';
import { MarketModule } from './modules/market/market.module';
import { TradingModule } from './modules/trading/trading.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { JobsModule } from './jobs/jobs.module';

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
