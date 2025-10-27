import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorsService {
  listErrors(scope?: string) {
    // TODO: fetch errors filtered by scope, sorted by occurred_at desc.
    return { scope, errors: [] };
  }
}
