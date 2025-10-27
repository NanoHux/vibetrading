import { Injectable } from '@nestjs/common';

@Injectable()
export class AiRunsService {
  getRun(id: string) {
    // TODO: return run metadata plus associated decisions and provider response summary.
    return { id };
  }
}
