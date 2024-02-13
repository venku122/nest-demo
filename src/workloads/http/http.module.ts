import { Module } from '@nestjs/common';
import { ServicesModule } from '../../services/services.module';
import { UsersController } from './users.controller';
import { ClientModule } from '../../clients/client.module';

@Module({
  imports: [ServicesModule, ClientModule],
  controllers: [UsersController],
})
export class HttpModule {}
