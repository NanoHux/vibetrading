import { Module } from '@nestjs/common';
import { ErrorsService } from './errors.service';
import { ErrorsController } from './errors.controller';

@Module({
  controllers: [ErrorsController],
  providers: [ErrorsService],
  exports: [ErrorsService],
})
export class ErrorsModule {}
