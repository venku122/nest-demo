import { Module } from '@nestjs/common';
import { ServicesModule } from '../../services/services.module';
import { UsersGrpcController } from './users.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UsersGrpcController],
})
export class GrpcModule {}
