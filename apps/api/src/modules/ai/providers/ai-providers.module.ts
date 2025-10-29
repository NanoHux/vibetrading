import { Module } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service.js';
import { AiProvidersController } from './ai-providers.controller.js';

@Module({
  controllers: [AiProvidersController],
  providers: [AiProvidersService],
  exports: [AiProvidersService],
})
export class AiProvidersModule {}
