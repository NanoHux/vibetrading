import { Injectable } from '@nestjs/common';
import { X402Service } from './x402/x402.service.js';
import { X402PrepareResponseDto } from './dto/x402-prepare-response.dto.js';
import { X402WebhookResponseDto } from './dto/x402-webhook-response.dto.js';
import { TokenLedgerEntryDto } from './dto/token-ledger-entry.dto.js';

@Injectable()
export class WalletService {
  constructor(private readonly x402Service: X402Service) {}

  prepareX402Payment(): X402PrepareResponseDto {
    // TODO: create invoice payload and secure nonce signature.
    return this.x402Service.createPaymentRequest();
  }

  handleX402Webhook(): X402WebhookResponseDto {
    // TODO: verify webhook signature, persist deposit, credit tokens, enforce caps.
    return this.x402Service.processWebhookCallback();
  }

  getTokenLedger(): TokenLedgerEntryDto[] {
    // TODO: return paginated token ledger entries for the authenticated user.
    return [
      {
        id: 'ledger-entry-demo',
        reason: 'deposit_reward',
        amount: '1000',
        balanceAfter: '5000',
        createdAt: new Date().toISOString(),
        refId: 'deposit-demo',
      },
    ];
  }
}
