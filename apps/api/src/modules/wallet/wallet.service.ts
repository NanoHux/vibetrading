import { Injectable } from '@nestjs/common';
import { X402Service } from './x402/x402.service';

@Injectable()
export class WalletService {
  constructor(private readonly x402Service: X402Service) {}

  prepareX402Payment() {
    // TODO: create invoice payload and secure nonce signature.
    return this.x402Service.createPaymentRequest();
  }

  handleX402Webhook() {
    // TODO: verify webhook signature, persist deposit, credit tokens, enforce caps.
    return this.x402Service.processWebhookCallback();
  }

  getTokenLedger() {
    // TODO: return paginated token ledger entries for the authenticated user.
    return [];
  }
}
