import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service.js';
import { UserProfileDto } from './dto/user-profile.dto.js';
import { UserBalanceDto } from './dto/user-balance.dto.js';
import { SiweAuthGuard } from '../auth/guards/siwe-auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(SiweAuthGuard)
  @Get('me')
  getProfile(@Req() request: Request): Promise<UserProfileDto> {
    return this.usersService.getCurrentProfile(request.siwe!.userId);
  }

  @UseGuards(SiweAuthGuard)
  @Get('me/balance')
  getBalance(@Req() request: Request): Promise<UserBalanceDto> {
    return this.usersService.getCurrentBalance(request.siwe!.userId);
  }
}
