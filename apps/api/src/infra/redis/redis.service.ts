import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: RedisClientType | null = null;

  async getClient() {
    if (!this.client) {
      this.client = createClient({
        url: process.env.REDIS_URL ?? 'redis://localhost:6379',
      });
      await this.client.connect();
    }

    return this.client;
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.disconnect();
    }
  }
}
