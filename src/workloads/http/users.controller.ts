import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../data/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): Promise<User[]> {
    console.info('UserController.getHello');
    return this.usersService.findAll();
  }

  @Post('/create')
  create(@Body() userData: Partial<User>): Promise<User> {
    console.info('UserController.create');
    return this.usersService.create(userData);
  }
}
