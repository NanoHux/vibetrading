import { Controller, Get, Query } from '@nestjs/common';
import { ErrorsService } from './errors.service.js';
import { ErrorEntryDto } from './dto/error-entry.dto.js';

@Controller('errors')
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsService) {}

  @Get()
  listErrors(@Query('scope') scope?: string): ErrorEntryDto[] {
    return this.errorsService.listErrors(scope);
  }
}
