import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service.js';
import { SiweNonceResponseDto } from './dto/siwe-nonce-response.dto.js';
import { SiweVerifyResponseDto } from './dto/siwe-verify-response.dto.js';
import { SiweVerifyRequestDto } from './dto/siwe-verify-request.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('siwe/nonce')
  getSiweNonce(@Req() request: Request): SiweNonceResponseDto {
    return this.authService.generateSiweNonce(request);
  }

  @Post('siwe/verify')
  verifySiweSession(
    @Req() request: Request,
    @Body() payload: SiweVerifyRequestDto,
  ): Promise<SiweVerifyResponseDto> {
    return this.authService.verifySiweSignature(request, payload);
  }
}
