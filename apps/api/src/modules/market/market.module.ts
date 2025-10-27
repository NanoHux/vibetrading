import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { HyperliquidModule } from './hyperliquid/hyperliquid.module';

@Module({
  imports: [HyperliquidModule],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService, HyperliquidModule],
})
export class MarketModule {}
