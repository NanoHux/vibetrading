import { Module } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service';
import { AiProvidersController } from './ai-providers.controller';

@Module({
  controllers: [AiProvidersController],
  providers: [AiProvidersService],
  exports: [AiProvidersService],
})
export class AiProvidersModule {}
