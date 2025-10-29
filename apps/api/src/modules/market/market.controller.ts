import { Controller, Get, Query } from '@nestjs/common';
import { MarketService } from './market.service.js';
import { MarketSnapshotDto } from './dto/market-snapshot.dto.js';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('snapshots')
  listSnapshots(
    @Query('symbol') symbol: string,
    @Query('tf') timeframe: string,
    @Query('limit') limit?: string,
  ): MarketSnapshotDto[] {
    return this.marketService.listSnapshots(symbol, timeframe, Number(limit ?? 10));
  }
}
