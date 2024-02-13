import { Module, Global, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisClient } from './redis.client';
import { KafkaClient } from './kafka.client';
import kafkaConfig from '../kafkaConfig';
import { ClientProxyFactory } from '@nestjs/microservices';

@Global()
@Module({
  imports: [],
  providers: [
    Logger,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create(kafkaConfig);
      },
      inject: [],
    },
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
    KafkaClient,
  ],
  exports: ['REDIS_CLIENT', RedisClient, KafkaClient, 'KAFKA_CLIENT'],
})
export class ClientModule {}
