import { Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service.js';
import { WebhookAckDto } from './dto/webhook-ack.dto.js';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('hyperliquid')
  handleHyperliquidWebhook(): WebhookAckDto {
    return this.webhooksService.handleHyperliquid();
  }

  @Post('wallet')
  handleWalletWebhook(): WebhookAckDto {
    return this.webhooksService.handleWalletEvent();
  }
}
