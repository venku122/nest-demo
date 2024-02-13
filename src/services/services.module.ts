import { Module, Logger } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { UsersService } from './users.service';
import { ClientModule } from '../clients/client.module';

@Module({
  imports: [DataModule, ClientModule],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class ServicesModule {}
