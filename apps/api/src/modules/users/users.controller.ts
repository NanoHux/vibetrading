import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserBalanceDto } from './dto/user-balance.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(): UserProfileDto {
    return this.usersService.getCurrentProfile();
  }

  @Get('me/balance')
  getBalance(): UserBalanceDto {
    return this.usersService.getCurrentBalance();
  }
}
