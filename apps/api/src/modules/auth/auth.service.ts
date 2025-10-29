import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { SiweMessage, generateNonce } from 'siwe';
import { AppConfigService } from '../../infra/config/config.service.js';
import { PrismaService } from '../../infra/prisma/prisma.service.js';
import { SiweNonceResponseDto } from './dto/siwe-nonce-response.dto.js';
import { SiweVerifyResponseDto } from './dto/siwe-verify-response.dto.js';
import { SiweVerifyRequestDto } from './dto/siwe-verify-request.dto.js';
import { SiweSession } from './interfaces/siwe-session.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: AppConfigService,
    private readonly prisma: PrismaService,
  ) {}

  generateSiweNonce(request: Request): SiweNonceResponseDto {
    const nonce = generateNonce();
    if (!request.session) {
      throw new BadRequestException('Session store unavailable');
    }

    request.session.siweNonce = nonce;
    return { nonce };
  }

  async verifySiweSignature(request: Request, payload: SiweVerifyRequestDto): Promise<SiweVerifyResponseDto> {
    if (!request.session) {
      throw new BadRequestException('Session store unavailable');
    }

    if (!request.session.siweNonce) {
      throw new UnauthorizedException('SIWE nonce not found or already used');
    }

    let message: SiweMessage;
    try {
      message = new SiweMessage(payload.message);
    } catch (error) {
      throw new BadRequestException('Invalid SIWE message');
    }

    const domainHost = message.domain?.toLowerCase() ?? '';
    const domainWithoutPort = domainHost.split(':')[0];
    const allowedDomains = this.config.siweAllowedDomains.map((value) => value.toLowerCase());
    const isDomainAllowed =
      allowedDomains.includes(domainHost) ||
      allowedDomains.includes(domainWithoutPort) ||
      allowedDomains.some((value) => domainWithoutPort.endsWith(`.${value}`));

    if (!isDomainAllowed) {
      throw new UnauthorizedException(`Domain ${message.domain} is not allowed`);
    }

    if (message.nonce !== request.session.siweNonce) {
      throw new UnauthorizedException('SIWE nonce mismatch');
    }

    try {
      await message.verify({
        signature: payload.signature,
        domain: message.domain,
        nonce: message.nonce,
      });
    } catch (error) {
      throw new UnauthorizedException('SIWE signature verification failed');
    }

    const address = message.address.toLowerCase();
    const chainId = Number(message.chainId);
    const chain = this.resolveChain(chainId);

    const wallet = await this.prisma.userWallet.findFirst({
      where: { address, chain },
      include: { user: true },
    });

    let userId: string;
    if (wallet) {
      userId = wallet.userId;
      if (!wallet.isPrimary) {
        await this.prisma.userWallet.update({
          where: { id: wallet.id },
          data: { isPrimary: true },
        });
      }
    } else {
      const user = await this.prisma.user.create({
        data: {
          wallets: {
            create: {
              address,
              chain,
              isPrimary: true,
            },
          },
        },
        include: {
          wallets: true,
        },
      });

      userId = user.id;
    }

    const expiresAt = new Date(Date.now() + this.config.sessionTtlMs).toISOString();
    const sessionPayload: SiweSession = {
      userId,
      address,
      chainId,
      expiresAt,
    };

    request.session.siwe = sessionPayload;
    request.siwe = sessionPayload;
    delete request.session.siweNonce;
    await this.persistSession(request);

    return {
      verified: true,
      address,
      userId,
    };
  }

  private resolveChain(chainId: number): string {
    if (chainId === 8453) {
      return 'base';
    }

    if (chainId === 84531) {
      return 'base-sepolia';
    }

    return `eip155:${chainId}`;
  }

  private persistSession(request: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      request.session?.save((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}
