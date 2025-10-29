import { Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service.js';
import { X402PrepareResponseDto } from './dto/x402-prepare-response.dto.js';
import { X402WebhookResponseDto } from './dto/x402-webhook-response.dto.js';
import { TokenLedgerEntryDto } from './dto/token-ledger-entry.dto.js';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('x402/prepare')
  preparePayment(): X402PrepareResponseDto {
    return this.walletService.prepareX402Payment();
  }

  @Post('x402/webhook')
  handleWebhook(): X402WebhookResponseDto {
    return this.walletService.handleX402Webhook();
  }

  @Get('token-ledger')
  listTokenLedger(): TokenLedgerEntryDto[] {
    return this.walletService.getTokenLedger();
  }
}
