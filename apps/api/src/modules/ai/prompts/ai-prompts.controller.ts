import { Controller, Get, Post } from '@nestjs/common';
import { AiPromptsService } from './ai-prompts.service';

@Controller('ai/prompts')
export class AiPromptsController {
  constructor(private readonly promptsService: AiPromptsService) {}

  @Get()
  listPrompts() {
    return this.promptsService.listPrompts();
  }

  @Post()
  createPrompt() {
    return this.promptsService.createPrompt();
  }
}
