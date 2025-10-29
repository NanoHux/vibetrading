import { Injectable } from '@nestjs/common';
import { AiProviderDto } from './dto/ai-provider.dto.js';

@Injectable()
export class AiProvidersService {
  listProviders(): AiProviderDto[] {
    // TODO: query providers via Prisma.
    return [
      {
        id: 'provider-deepseek',
        name: 'deepseek',
        apiBase: 'https://api.deepseek.com',
        models: ['deepseek-chat', 'deepseek-trader'],
      },
    ];
  }

  createProvider(): AiProviderDto {
    // TODO: persist provider metadata and model catalog.
    return {
      id: 'provider-new',
      name: 'new-provider',
      apiBase: undefined,
      models: [],
    };
  }
}
