import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller.js';
import { WalletService } from './wallet.service.js';
import { X402Service } from './x402/x402.service.js';

@Module({
  controllers: [WalletController],
  providers: [WalletService, X402Service],
  exports: [WalletService, X402Service],
})
export class WalletModule {}
