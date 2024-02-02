import { Injectable, Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisClient {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly logger: Logger,
  ) {}

  async setKey(key: string, value: string): Promise<void> {
    this.logger.log('RedisClient.setKey');
    await this.redis.set(key, value);
  }

  async getKey(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async incrementKey(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async decrementKey(key: string): Promise<number> {
    return this.redis.decr(key);
  }
}
