import { Injectable } from '@nestjs/common';
import { AiAgentDto } from './dto/ai-agent.dto.js';
import { CreateAiAgentDto } from './dto/create-ai-agent.dto.js';
import { AiAgentRunResponseDto } from './dto/ai-agent-run-response.dto.js';

@Injectable()
export class AiAgentsService {
  listAgents(): AiAgentDto[] {
    // TODO: fetch agents with provider and prompt metadata.
    return [
      {
        id: 'agent-demo',
        name: 'DeepSeek-A1',
        model: 'deepseek-trader',
        provider: 'deepseek',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  createAgent(payload: CreateAiAgentDto): AiAgentDto {
    // TODO: enforce unique (apiKey, prompt) constraint and persist agent.
    return {
      id: `agent-${payload.agentName}`,
      name: payload.agentName,
      model: payload.modelName,
      provider: payload.providerId,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
  }

  triggerRun(agentId: string): AiAgentRunResponseDto {
    // TODO: dispatch BullMQ job to execute AI run for the requested agent.
    return {
      agentId,
      runId: `${agentId}-run-${Date.now()}`,
      status: 'queued',
    };
  }
}
