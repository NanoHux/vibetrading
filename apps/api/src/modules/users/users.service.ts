import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getCurrentProfile() {
    // TODO: fetch user profile using request context.
    return { id: null, email: null };
  }

  getCurrentBalance() {
    // TODO: aggregate token balance, deposit totals, and AI account equity.
    return { tokenBalance: 0, equityUsd: 0 };
  }
}
