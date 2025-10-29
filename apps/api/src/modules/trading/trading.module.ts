import { Module } from '@nestjs/common';
import { PositionsModule } from './positions/positions.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { DecisionsModule } from './decisions/decisions.module.js';
import { BalancesModule } from './balances/balances.module.js';
import { MetricsModule } from './metrics/metrics.module.js';

@Module({
  imports: [PositionsModule, OrdersModule, DecisionsModule, BalancesModule, MetricsModule],
  exports: [PositionsModule, OrdersModule, DecisionsModule, BalancesModule, MetricsModule],
})
export class TradingModule {}
