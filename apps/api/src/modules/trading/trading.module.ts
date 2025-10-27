import { Module } from '@nestjs/common';
import { PositionsModule } from './positions/positions.module';
import { OrdersModule } from './orders/orders.module';
import { DecisionsModule } from './decisions/decisions.module';
import { BalancesModule } from './balances/balances.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [PositionsModule, OrdersModule, DecisionsModule, BalancesModule, MetricsModule],
  exports: [PositionsModule, OrdersModule, DecisionsModule, BalancesModule, MetricsModule],
})
export class TradingModule {}
