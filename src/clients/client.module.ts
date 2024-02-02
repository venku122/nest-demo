import { Module, Global, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisClient } from './redis.client';

@Global()
@Module({
  providers: [
    Logger,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redis = new Redis({
          host: 'localhost', // Redis host
          port: 6379, // Redis port
          // password: 'yourpassword', // Redis password if needed
          // db: 0, // Default DB
        });
        return redis;
      },
    },
    RedisClient,
  ],
  exports: ['REDIS_CLIENT', RedisClient],
})
export class ClientModule {}
