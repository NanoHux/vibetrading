import { Injectable } from '@nestjs/common';

@Injectable()
export class HyperliquidService {
  fetchCachedSnapshots(symbol: string, timeframe: string, limit: number) {
    // TODO: query market_snapshots and handle indicator computations.
    return {
      symbol,
      timeframe,
      limit,
      snapshots: [],
    };
  }

  queueSnapshotPull(symbol: string) {
    // TODO: enqueue BullMQ job to fetch latest Hyperliquid data.
    return { symbol, queued: true };
  }
}
