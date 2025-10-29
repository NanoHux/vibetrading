import { Module } from '@nestjs/common';
import { MarketController } from './market.controller.js';
import { MarketService } from './market.service.js';
import { HyperliquidModule } from './hyperliquid/hyperliquid.module.js';

@Module({
  imports: [HyperliquidModule],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService, HyperliquidModule],
})
export class MarketModule {}
