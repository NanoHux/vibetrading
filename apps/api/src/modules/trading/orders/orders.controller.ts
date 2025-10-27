import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderSummaryDto } from './dto/order-summary.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderSubmissionResponseDto } from './dto/order-submission-response.dto';

@Controller('trading/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  listOrders(): OrderSummaryDto[] {
    return this.ordersService.listOrders();
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDto): OrderSubmissionResponseDto {
    return this.ordersService.createOrder(payload);
  }
}
