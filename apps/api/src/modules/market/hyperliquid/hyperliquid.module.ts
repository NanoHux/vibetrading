import { Module } from '@nestjs/common';
import { HyperliquidService } from './hyperliquid.service.js';

@Module({
  providers: [HyperliquidService],
  exports: [HyperliquidService],
})
export class HyperliquidModule {}
