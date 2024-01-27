import { Module } from '@nestjs/common';
import { ServicesModule } from '../../services/services.module';
import { UserController } from './users.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UserController],
})
export class HttpModule {}
