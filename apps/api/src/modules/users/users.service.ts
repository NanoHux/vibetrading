import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service.js';
import { UserProfileDto } from './dto/user-profile.dto.js';
import { UserBalanceDto } from './dto/user-balance.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    };
  }

  async getCurrentBalance(userId: string): Promise<UserBalanceDto> {
    const latestLedger = await this.prisma.tokenLedger.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const depositAggregate = await this.prisma.deposit.aggregate({
      where: { userId, status: 'confirmed' },
      _sum: {
        amountUsdc: true,
      },
    });

    // TODO: integrate AI account equity aggregation.
    return {
      tokenBalance: Number(latestLedger?.balanceAfter ?? 0),
      equityUsd: 0,
      totalDepositsUsd: Number(depositAggregate._sum.amountUsdc ?? 0),
    };
  }
}
