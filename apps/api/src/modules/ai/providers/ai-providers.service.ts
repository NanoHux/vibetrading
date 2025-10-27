import { Injectable } from '@nestjs/common';

@Injectable()
export class AiProvidersService {
  listProviders() {
    // TODO: query providers via Prisma.
    return [];
  }

  createProvider() {
    // TODO: persist provider metadata and model catalog.
    return {};
  }
}
