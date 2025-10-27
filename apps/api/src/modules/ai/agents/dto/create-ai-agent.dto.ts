import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateAiAgentDto {
  @IsUUID()
  providerId!: string;

  @IsUUID()
  apiKeyId!: string;

  @IsUUID()
  promptId!: string;

  @IsString()
  @IsNotEmpty()
  agentName!: string;

  @IsString()
  @IsNotEmpty()
  modelName!: string;
}
