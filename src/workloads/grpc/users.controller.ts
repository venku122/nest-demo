/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Logger } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../data/entities/user.entity';
import { ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
  FindOneRequest,
  CreateUserRequest,
} from '../../protos/types/services/users';
import { User as ProtoUser } from '../../protos/types/models/users';

@Controller()
export class UsersGrpcController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersGrpcController.name);

  @GrpcMethod()
  async findOne(
    data: FindOneRequest,
    _metadata: Metadata,
    _call: ServerUnaryCall<FindOneRequest, ProtoUser>,
  ): Promise<User> {
    this.logger.log('UsersGrpcController.getHello');
    const user = await this.usersService.findOne(data.id);

    if (user == null) {
      throw new Error('User not found');
    }

    return user;
  }

  @GrpcMethod()
  create(
    data: CreateUserRequest,
    _metadata: Metadata,
    _call: ServerUnaryCall<CreateUserRequest, ProtoUser>,
  ): Promise<User> {
    this.logger.log('UsersGrpcController.create');
    return this.usersService.create(data);
  }
}
