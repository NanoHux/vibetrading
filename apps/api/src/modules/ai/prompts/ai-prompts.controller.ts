import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiPromptsService } from './ai-prompts.service.js';
import { AiPromptDto } from './dto/ai-prompt.dto.js';
import { CreateAiPromptDto } from './dto/create-ai-prompt.dto.js';

@Controller('ai/prompts')
export class AiPromptsController {
  constructor(private readonly promptsService: AiPromptsService) {}

  @Get()
  listPrompts(): AiPromptDto[] {
    return this.promptsService.listPrompts();
  }

  @Post()
  createPrompt(@Body() payload: CreateAiPromptDto): AiPromptDto {
    return this.promptsService.createPrompt(payload);
  }
}
