import { Module } from '@nestjs/common';
import { ErrorsService } from './errors.service.js';
import { ErrorsController } from './errors.controller.js';

@Module({
  controllers: [ErrorsController],
  providers: [ErrorsService],
  exports: [ErrorsService],
})
export class ErrorsModule {}
