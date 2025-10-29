import { Injectable } from '@nestjs/common';
import { PositionSummaryDto } from './dto/position-summary.dto.js';

@Injectable()
export class PositionsService {
  listOpenPositions(): PositionSummaryDto[] {
    // TODO: return positions joined with Hyperliquid metadata and AI agent context.
    return [
      {
        id: 'position-demo',
        symbol: 'ETH',
        side: 'long',
        quantity: '10',
        entryPrice: '3400.25',
        status: 'open',
        openedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        leverage: '5',
        unrealizedPnlUsd: '125.45',
      },
    ];
  }
}
