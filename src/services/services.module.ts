import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { UsersService } from './users.service';

@Module({
  imports: [DataModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class ServicesModule {}
