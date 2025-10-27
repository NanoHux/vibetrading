import { Injectable } from '@nestjs/common';
import { AiPromptDto } from './dto/ai-prompt.dto';
import { CreateAiPromptDto } from './dto/create-ai-prompt.dto';

@Injectable()
export class AiPromptsService {
  listPrompts(): AiPromptDto[] {
    // TODO: return prompts with version metadata.
    return [
      {
        id: 'prompt-demo',
        providerId: 'provider-deepseek',
        name: 'ds-prompt-v1',
        content: 'You are an autonomous trading agent...',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  createPrompt(payload: CreateAiPromptDto): AiPromptDto {
    // TODO: persist prompt content and link to provider.
    return {
      id: prompt-,
      providerId: payload.providerId,
      name: payload.name,
      content: payload.content,
      createdAt: new Date().toISOString(),
    };
  }
}
