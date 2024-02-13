import { Logger, Module } from '@nestjs/common';
import { UsersConsumer } from './users.consumer';
import { ClientModule } from '../../clients/client.module';

@Module({
  providers: [Logger],
  imports: [ClientModule],
  controllers: [UsersConsumer],
})
export class ConsumerModule {}
