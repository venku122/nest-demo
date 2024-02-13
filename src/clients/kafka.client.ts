import { ClientKafka } from '@nestjs/microservices';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../protos/types/events/users';
import { User } from '../data/entities/user.entity';

@Injectable()
export class KafkaClient {
  constructor(
    @Inject('KAFKA_CLIENT') private client: ClientKafka,
    private readonly logger: Logger,
  ) {}

  async publishUserCreatedEvent(user: User) {
    this.logger.log('KafkaClient.publishUserCreatedEvent');
    const event = UserCreatedEvent.fromPartial({
      newUser: user,
    });

    this.client.emit('UserCreatedEvent', UserCreatedEvent.toJSON(event));
  }
}
