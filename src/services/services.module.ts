import { Module, Logger } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { UsersService } from './users.service';

@Module({
  imports: [DataModule],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class ServicesModule {}
