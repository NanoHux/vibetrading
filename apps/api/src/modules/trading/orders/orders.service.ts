import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  listOrders() {
    // TODO: return paginated orders per account with status transitions.
    return [];
  }

  createOrder() {
    // TODO: submit order to Hyperliquid with client ID dedupe and risk limits.
    return {};
  }
}
