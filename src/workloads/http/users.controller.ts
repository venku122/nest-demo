import { Controller, Get } from '@nestjs/common';
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
}
