import { Injectable } from '@nestjs/common';
import { OrderSummaryDto } from './dto/order-summary.dto.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderSubmissionResponseDto } from './dto/order-submission-response.dto.js';

@Injectable()
export class OrdersService {
  listOrders(): OrderSummaryDto[] {
    // TODO: return paginated orders per account with status transitions.
    return [
      {
        id: 'order-demo',
        symbol: 'ETH',
        side: 'buy',
        orderType: 'limit',
        qty: '5',
        price: '3350.00',
        status: 'created',
        realizedPnl: '0',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  createOrder(payload: CreateOrderDto): OrderSubmissionResponseDto {
    // TODO: submit order to Hyperliquid with client ID dedupe and risk limits.
    return {
      orderId: `order-${Date.now()}`,
      status: payload.orderType === 'market' ? 'submitted' : 'queued',
    };
  }
}
