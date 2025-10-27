import { Injectable } from '@nestjs/common';
import { ErrorEntryDto } from './dto/error-entry.dto';

@Injectable()
export class ErrorsService {
  listErrors(scope?: string): ErrorEntryDto[] {
    // TODO: fetch errors filtered by scope, sorted by occurred_at desc.
    const now = Date.now();
    return [
      {
        id: 'error-demo',
        scope: scope ?? 'ai',
        message: 'Sample error log entry',
        occurredAt: new Date(now).toISOString(),
        detail: { reason: 'placeholder' },
      },
    ];
  }
}
