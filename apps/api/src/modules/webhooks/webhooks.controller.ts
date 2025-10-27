import { Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('hyperliquid')
  handleHyperliquidWebhook() {
    return this.webhooksService.handleHyperliquid();
  }

  @Post('wallet')
  handleWalletWebhook() {
    return this.webhooksService.handleWalletEvent();
  }
}
