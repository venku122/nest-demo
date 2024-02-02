import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisClient } from '../../clients/redis.client';

@Injectable()
export class InvocationCountInterceptor implements NestInterceptor {
  constructor(private readonly redisClient: RedisClient) {}

  private readonly logger = new Logger(InvocationCountInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();

    const key = (() => {
      switch (type) {
        case 'http': {
          const request = context.switchToHttp().getRequest();
          const endpoint = request.route.path;
          const method = request.method;
          return `http:endpoint:${method}:${endpoint}`;
        }
        case 'rpc': {
          const handler = context.getHandler().name;
          return `rpc:method:${handler}`;
        }
        case 'ws': {
          return `ws`;
        }
        default: {
          // The Nestjs types do not include graphql
          // so we check in the default case for graphql
          if (type === 'graphql') {
            return `gql:${context.getHandler().name}`;
          }
          return `unknown:type`;
        }
      }
    })();

    // Increment the count in Redis
    this.redisClient.incrementKey(`${key}:count`);

    return next.handle().pipe(tap(() => this.logger.log(`${key} was called`)));
  }
}
