import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('siwe/nonce')
  getSiweNonce() {
    return this.authService.generateSiweNonce();
  }

  @Post('siwe/verify')
  verifySiweSession() {
    return this.authService.verifySiweSignature();
  }
}
