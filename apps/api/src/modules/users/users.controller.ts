import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile() {
    return this.usersService.getCurrentProfile();
  }

  @Get('me/balance')
  getBalance() {
    return this.usersService.getCurrentBalance();
  }
}
