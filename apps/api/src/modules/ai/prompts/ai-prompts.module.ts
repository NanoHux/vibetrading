import { Module } from '@nestjs/common';
import { AiPromptsController } from './ai-prompts.controller.js';
import { AiPromptsService } from './ai-prompts.service.js';

@Module({
  controllers: [AiPromptsController],
  providers: [AiPromptsService],
  exports: [AiPromptsService],
})
export class AiPromptsModule {}
