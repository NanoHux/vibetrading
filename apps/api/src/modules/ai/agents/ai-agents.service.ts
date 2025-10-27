import { Injectable } from '@nestjs/common';

@Injectable()
export class AiAgentsService {
  listAgents() {
    // TODO: fetch agents with provider and prompt metadata.
    return [];
  }

  createAgent() {
    // TODO: enforce unique (apiKey, prompt) constraint and persist agent.
    return {};
  }

  triggerRun(agentId: string) {
    // TODO: dispatch BullMQ job to execute AI run for the requested agent.
    return { agentId, queued: true };
  }
}
