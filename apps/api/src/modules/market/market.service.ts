import { Injectable } from '@nestjs/common';
import { HyperliquidService } from './hyperliquid/hyperliquid.service';

@Injectable()
export class MarketService {
  constructor(private readonly hyperliquid: HyperliquidService) {}

  listSnapshots(symbol: string, timeframe: string, limit: number) {
    // TODO: pull from Prisma using filters and integrate indicator calculations.
    return this.hyperliquid.fetchCachedSnapshots(symbol, timeframe, limit);
  }
}
