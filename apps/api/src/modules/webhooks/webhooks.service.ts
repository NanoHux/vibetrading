import { Injectable } from '@nestjs/common';
import { WebhookAckDto } from './dto/webhook-ack.dto.js';

@Injectable()
export class WebhooksService {
  handleHyperliquid(): WebhookAckDto {
    // TODO: validate signature, sync orders/positions, and record audit trail.
    return { accepted: true };
  }

  handleWalletEvent(): WebhookAckDto {
    // TODO: process wallet events (x402, SIWE session updates, on-chain callbacks).
    return { accepted: true };
  }
}
