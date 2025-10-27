import { IsIn, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  accountId!: string;

  @IsString()
  symbol!: string;

  @IsIn(['buy', 'sell'])
  side!: 'buy' | 'sell';

  @IsIn(['market', 'limit', 'reduce_only', 'tp', 'sl'])
  orderType!: 'market' | 'limit' | 'reduce_only' | 'tp' | 'sl';

  @IsNumberString()
  qty!: string;

  @IsOptional()
  @IsNumberString()
  price?: string;
}
