import { Module } from '@nestjs/common';
import { AiProvidersModule } from './providers/ai-providers.module.js';
import { AiAgentsModule } from './agents/ai-agents.module.js';
import { AiPromptsModule } from './prompts/ai-prompts.module.js';
import { AiRunsModule } from './runs/ai-runs.module.js';

@Module({
  imports: [AiProvidersModule, AiAgentsModule, AiPromptsModule, AiRunsModule],
  exports: [AiProvidersModule, AiAgentsModule, AiPromptsModule, AiRunsModule],
})
export class AiModule {}
