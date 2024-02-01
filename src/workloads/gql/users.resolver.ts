import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../../data/entities/user.entity';
import { UsersService } from '../../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
