import { Module } from '@nestjs/common';
import { ServicesModule } from '../../services/services.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [ServicesModule],
  providers: [UsersResolver],
})
export class GqlModule {}
