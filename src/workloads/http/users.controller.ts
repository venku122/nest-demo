import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../data/entities/user.entity';
import { RedisClient } from '../../clients/redis.client';

type KeyValue = {
  key: string;
  value: string;
};


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisClient: RedisClient,
  ) {}

  private readonly logger = new Logger(UsersController.name);

  @Get()
  getHello(): Promise<User[]> {
    this.logger.log('UsersController.getHello');
    return this.usersService.findAll();
  }

  @Post('/create')
  create(@Body() userData: Partial<User>): Promise<User> {
    this.logger.log('UsersController.create');
    return this.usersService.create(userData);
  }

  @Post('/increment')
  increment(@Body() keyData: KeyValue): Promise<void> {
    this.logger.log('UsersController.increment');
    return this.redisClient.setKey(keyData.key, keyData.value);
  }
}
