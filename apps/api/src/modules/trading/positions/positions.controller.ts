import { Controller, Get } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionSummaryDto } from './dto/position-summary.dto';

@Controller('trading/positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  listPositions(): PositionSummaryDto[] {
    return this.positionsService.listOpenPositions();
  }
}
