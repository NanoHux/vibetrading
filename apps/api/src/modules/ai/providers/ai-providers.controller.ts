import { Controller, Get, Post } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service';

@Controller('ai/providers')
export class AiProvidersController {
  constructor(private readonly providersService: AiProvidersService) {}

  @Get()
  listProviders() {
    return this.providersService.listProviders();
  }

  @Post()
  createProvider() {
    return this.providersService.createProvider();
  }
}
