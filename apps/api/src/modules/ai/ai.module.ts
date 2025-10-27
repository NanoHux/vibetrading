import { Module } from '@nestjs/common';
import { AiProvidersModule } from './providers/ai-providers.module';
import { AiAgentsModule } from './agents/ai-agents.module';
import { AiPromptsModule } from './prompts/ai-prompts.module';
import { AiRunsModule } from './runs/ai-runs.module';

@Module({
  imports: [AiProvidersModule, AiAgentsModule, AiPromptsModule, AiRunsModule],
  exports: [AiProvidersModule, AiAgentsModule, AiPromptsModule, AiRunsModule],
})
export class AiModule {}
