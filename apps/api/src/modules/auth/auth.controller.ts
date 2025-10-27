import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SiweNonceResponseDto } from './dto/siwe-nonce-response.dto';
import { SiweVerifyResponseDto } from './dto/siwe-verify-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('siwe/nonce')
  getSiweNonce(): SiweNonceResponseDto {
    return this.authService.generateSiweNonce();
  }

  @Post('siwe/verify')
  verifySiweSession(): SiweVerifyResponseDto {
    return this.authService.verifySiweSignature();
  }
}
