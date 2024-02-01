import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from './workloads/http/http.module';
import { GqlModule } from './workloads/gql/gql.module';
import { DataModule } from './data/data.module';
import metadata from './metadata';
import { join } from 'path';

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
    DataModule,
    HttpModule,
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
  providers: [],
})
export class AppModule {}
