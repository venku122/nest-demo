import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { InvocationCountInterceptor } from './invocationCount.interceptor';
import { RedisClient } from '../../clients/redis.client';

@Global()
@Module({
  providers: [InvocationCountInterceptor],
  exports: [InvocationCountInterceptor],
})
export class MyModule implements NestModule {
  constructor(private readonly redisClient: RedisClient) {}

  configure(consumer: MiddlewareConsumer) {
    // Check if REDIS_CLIENT is available
    if (this.redisClient) {
      consumer.apply(InvocationCountInterceptor).forRoutes('*');
    }
  }
}
