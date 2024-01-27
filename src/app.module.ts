import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from './workloads/http/http.module';
import { DataModule } from './data/data.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
