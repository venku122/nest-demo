import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../data/entities/user.entity';
import { KafkaClient } from '../clients/kafka.client';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Optional() private readonly kafkaClient: KafkaClient | undefined,
    private readonly logger: Logger,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    this.logger.log('[users.service] Creating user...');
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    if (this.kafkaClient) {
      console.log('publishing event');
      this.kafkaClient.publishUserCreatedEvent(newUser);
    }
    return newUser;
  }

  findAll(): Promise<User[]> {
    this.logger.log('[users.service] Fetching all users...');
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    this.logger.log('[users.service] Fetching user...');
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    this.logger.log('[users.service] Deleting user...');
    await this.usersRepository.delete(id);
  }
}
