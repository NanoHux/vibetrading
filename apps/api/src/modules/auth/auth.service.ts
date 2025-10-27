import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SiweNonceResponseDto } from './dto/siwe-nonce-response.dto';
import { SiweVerifyResponseDto } from './dto/siwe-verify-response.dto';

@Injectable()
export class AuthService {
  generateSiweNonce(): SiweNonceResponseDto {
    // TODO: integrate SIWE nonce generation and Redis-backed session tracking.
    return { nonce: randomUUID() };
  }

  verifySiweSignature(): SiweVerifyResponseDto {
    // TODO: verify SIWE signature, issue session/JWT, and persist session.
    return { verified: false };
  }
}
