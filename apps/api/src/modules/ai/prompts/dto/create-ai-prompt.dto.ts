import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAiPromptDto {
  @IsUUID()
  providerId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
