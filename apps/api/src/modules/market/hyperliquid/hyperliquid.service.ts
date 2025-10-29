import { Injectable } from '@nestjs/common';
import { MarketSnapshotDto } from '../dto/market-snapshot.dto.js';

@Injectable()
export class HyperliquidService {
  fetchCachedSnapshots(symbol: string, timeframe: string, limit: number): MarketSnapshotDto[] {
    // TODO: query market_snapshots and handle indicator computations.
    return Array.from({ length: limit }).map((_, index) => ({
      id: `snapshot-${index}`,
      symbol: symbol ?? 'BTC',
      timeframe: timeframe ?? '1m',
      snapshotAt: new Date(Date.now() - index * 60_000).toISOString(),
      price: (68000 + index * 10).toFixed(2),
      indicators: {
        ema20: '67950.42',
        ema50: '67500.11',
        macd: '120.33',
        rsi7: '58.4',
        rsi14: '55.2',
        atr14: '250.12',
      },
      oiFunding: {
        openInterest: '1234567',
        fundingRate: '0.0001',
      },
    }));
  }

  queueSnapshotPull(symbol: string) {
    // TODO: enqueue BullMQ job to fetch latest Hyperliquid data.
    return { symbol, queued: true };
  }
}
