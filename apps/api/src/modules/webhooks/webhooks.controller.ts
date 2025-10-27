import { Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhookAckDto } from './dto/webhook-ack.dto';

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
