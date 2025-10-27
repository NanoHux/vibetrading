import { Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('x402/prepare')
  preparePayment() {
    return this.walletService.prepareX402Payment();
  }

  @Post('x402/webhook')
  handleWebhook() {
    return this.walletService.handleX402Webhook();
  }

  @Get('token-ledger')
  listTokenLedger() {
    return this.walletService.getTokenLedger();
  }
}
