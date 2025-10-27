import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { X402Service } from './x402/x402.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, X402Service],
  exports: [WalletService, X402Service],
})
export class WalletModule {}
