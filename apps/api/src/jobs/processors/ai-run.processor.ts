import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

@Injectable()
export class AiRunProcessor {
  async handle(job: Job<{ agentId: string }>) {
    // TODO: compose prompt, call provider adapter, persist ai_runs + ai_decisions.
    return { agentId: job.data.agentId };
  }
}
