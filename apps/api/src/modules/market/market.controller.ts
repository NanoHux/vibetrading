import { Controller, Get, Query } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('snapshots')
  listSnapshots(
    @Query('symbol') symbol: string,
    @Query('tf') timeframe: string,
    @Query('limit') limit?: string,
  ) {
    return this.marketService.listSnapshots(symbol, timeframe, Number(limit ?? 10));
  }
}
