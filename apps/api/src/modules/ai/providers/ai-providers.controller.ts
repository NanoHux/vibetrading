import { Controller, Get, Post } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service.js';
import { AiProviderDto } from './dto/ai-provider.dto.js';

@Controller('ai/providers')
export class AiProvidersController {
  constructor(private readonly providersService: AiProvidersService) {}

  @Get()
  listProviders(): AiProviderDto[] {
    return this.providersService.listProviders();
  }

  @Post()
  createProvider(): AiProviderDto {
    return this.providersService.createProvider();
  }
}
