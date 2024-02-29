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
import { ConsumerModule } from './workloads/consumer/consumer.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

const imports = [
  DevtoolsModule.register({
    http: process.env.NODE_ENV !== 'production',
    port: 1234,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_URL || 'localhost',
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT)
      : 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'dev_password',
    database: process.env.POSTGRES_DB_NAME || 'test',
    synchronize: true,
    autoLoadEntities: true,
  }),
  ClientModule,
  DataModule,
];

if (process.env.EXPOSE_GRPC === 'true') {
  imports.push(GrpcModule);
}

if (process.env.EXPOSE_HTTP === 'true') {
  imports.push(HttpModule);
}

if (process.env.EXPOSE_CONSUMER === 'true') {
  imports.push(ConsumerModule);
}

if (process.env.EXPOSE_GQL === 'true') {
  imports.push(GqlModule);
  imports.push(
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true, // set to false in production
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      metadata,
      introspection: true,
    }),
  );
}

@Module({
  imports: imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
