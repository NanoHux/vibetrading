import { Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserBalanceDto } from './dto/user-balance.dto';

@Injectable()
export class UsersService {
  getCurrentProfile(): UserProfileDto {
    // TODO: fetch user profile using request context.
    return {
      id: null,
      email: null,
      displayName: null,
    };
  }

  getCurrentBalance(): UserBalanceDto {
    // TODO: aggregate token balance, deposit totals, and AI account equity.
    return {
      tokenBalance: 0,
      equityUsd: 0,
      totalDepositsUsd: 0,
    };
  }
}
