import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
  Transport,
} from '@nestjs/microservices';
import { UserCreatedEvent } from '../../protos/types/events/users';

@Controller()
export class UsersConsumer {
  private readonly logger = new Logger(UsersConsumer.name);

  @EventPattern('UserCreatedEvent', Transport.KAFKA)
  async handleUserCreatedEvent(
    @Payload() message: UserCreatedEvent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Ctx() _context: KafkaContext,
  ) {
    try {
      if (message.newUser == undefined) {
        throw new Error('newUser is undefined');
      }
      this.logger.log('[consumer] new user was created', message.newUser);
    } catch (error) {
      this.logger.error('kafka event error', error);
    }
  }
}
