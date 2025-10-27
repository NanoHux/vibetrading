import { Controller, Get } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('trading/positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  listPositions() {
    return this.positionsService.listOpenPositions();
  }
}
