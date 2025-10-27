import { Controller, Get, Query } from '@nestjs/common';
import { ErrorsService } from './errors.service';

@Controller('errors')
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsService) {}

  @Get()
  listErrors(@Query('scope') scope?: string) {
    return this.errorsService.listErrors(scope);
  }
}
