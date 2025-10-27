import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('ai-runs')
export class AiRunProcessor {
  @Process()
  async handle(job: Job<{ agentId: string }>) {
    // TODO: compose prompt, call provider adapter, persist ai_runs + ai_decisions.
    return { agentId: job.data.agentId };
  }
}
