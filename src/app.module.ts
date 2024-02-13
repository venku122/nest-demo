import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from './workloads/http/http.module';
import { GqlModule } from './workloads/gql/gql.module';
import { GrpcModule } from './workloads/grpc/grpc.module';
import { DataModule } from './data/data.module';
import metadata from './metadata';
import { join } from 'path';
import { ClientModule } from './clients/client.module';
import { InvocationCountInterceptor } from './utils/interceptors/invocationCount.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConsumerModule } from './workloads/consumer/consumer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'dev_password',
      database: 'test',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientModule,
    DataModule,
    HttpModule,
    GrpcModule,
    ConsumerModule,
    GqlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true, // set to false in production
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      metadata,
      introspection: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: InvocationCountInterceptor,
    },
  ],
})
export class AppModule {}
