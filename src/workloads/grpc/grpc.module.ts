import { Module } from '@nestjs/common';
import { ServicesModule } from '../../services/services.module';
import { UsersGrpcController } from './users.controller';
import { ClientModule } from '../../clients/client.module';

@Module({
  imports: [ServicesModule, ClientModule],
  controllers: [UsersGrpcController],
})
export class GrpcModule {}
