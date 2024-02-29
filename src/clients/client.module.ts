import { Module, Global, Logger, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisClient } from './redis.client';
import { KafkaClient } from './kafka.client';
import kafkaConfig from '../kafkaConfig';
import { ClientProxyFactory } from '@nestjs/microservices';

const providers: Provider[] = [Logger];
const exportsList = [];

if (process.env.USE_KAFKA === 'true') {
  providers.push({
    provide: 'KAFKA_CLIENT',
    useFactory: () => {
      return ClientProxyFactory.create(kafkaConfig);
    },
    inject: [],
  });
  providers.push(KafkaClient);
  exportsList.push(KafkaClient);
  exportsList.push('KAFKA_CLIENT');
}

if (process.env.USE_REDIS === 'true') {
  providers.push({
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const redis = new Redis({
        host: process.env.REDIS_URL || 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      });
      return redis;
    },
  });
  providers.push(RedisClient);
  exportsList.push(RedisClient);
  exportsList.push('REDIS_CLIENT');
}

@Global()
@Module({
  imports: [],
  providers: providers,
  exports: exportsList,
})
export class ClientModule {}
