import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  handleHyperliquid() {
    // TODO: validate signature, sync orders/positions, and record audit trail.
    return { accepted: true };
  }

  handleWalletEvent() {
    // TODO: process wallet events (x402, SIWE session updates, on-chain callbacks).
    return { accepted: true };
  }
}
