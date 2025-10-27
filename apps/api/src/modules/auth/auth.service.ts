import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  generateSiweNonce() {
    // TODO: integrate SIWE nonce generation and Redis-backed session tracking.
    return { nonce: 'replace-with-randomized-nonce' };
  }

  verifySiweSignature() {
    // TODO: verify SIWE signature, issue session/JWT, and persist session.
    return { verified: false };
  }
}
