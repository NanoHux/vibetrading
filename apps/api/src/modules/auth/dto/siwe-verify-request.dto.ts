import { IsNotEmpty, IsString } from 'class-validator';

export class SiweVerifyRequestDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  signature!: string;
}
