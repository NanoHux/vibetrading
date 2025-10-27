import { Module } from '@nestjs/common';
import { AiPromptsController } from './ai-prompts.controller';
import { AiPromptsService } from './ai-prompts.service';

@Module({
  controllers: [AiPromptsController],
  providers: [AiPromptsService],
  exports: [AiPromptsService],
})
export class AiPromptsModule {}
