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
  constructor(private readonly logger: Logger) {}

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
      this.logger.log('new user was created', message.newUser);
    } catch (error) {
      this.logger.error('kafka event error', error);
    }
  }
}
