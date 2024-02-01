/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nest_demo";

export interface FindOneRequest {
  id: number;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

function createBaseFindOneRequest(): FindOneRequest {
  return { id: 0 };
}

export const FindOneRequest = {
  encode(message: FindOneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindOneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindOneRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindOneRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: FindOneRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindOneRequest>, I>>(base?: I): FindOneRequest {
    return FindOneRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindOneRequest>, I>>(object: I): FindOneRequest {
    const message = createBaseFindOneRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseCreateUserRequest(): CreateUserRequest {
  return { firstName: "", lastName: "", isActive: false };
}

export const CreateUserRequest = {
  encode(message: CreateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.isActive === true) {
      writer.uint32(24).bool(message.isActive);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isActive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    return {
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : "",
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : "",
      isActive: isSet(object.isActive) ? globalThis.Boolean(object.isActive) : false,
    };
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.isActive === true) {
      obj.isActive = message.isActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserRequest>, I>>(base?: I): CreateUserRequest {
    return CreateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateUserRequest>, I>>(object: I): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
};

function createBaseUser(): User {
  return { id: 0, firstName: "", lastName: "", isActive: false };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.firstName !== "") {
      writer.uint32(18).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(26).string(message.lastName);
    }
    if (message.isActive === true) {
      writer.uint32(32).bool(message.isActive);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isActive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : "",
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : "",
      isActive: isSet(object.isActive) ? globalThis.Boolean(object.isActive) : false,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.isActive === true) {
      obj.isActive = message.isActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
};

export type UsersGrpcControllerService = typeof UsersGrpcControllerService;
export const UsersGrpcControllerService = {
  findOne: {
    path: "/nest_demo.UsersGrpcController/FindOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindOneRequest) => Buffer.from(FindOneRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindOneRequest.decode(value),
    responseSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    responseDeserialize: (value: Buffer) => User.decode(value),
  },
  create: {
    path: "/nest_demo.UsersGrpcController/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateUserRequest) => Buffer.from(CreateUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateUserRequest.decode(value),
    responseSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    responseDeserialize: (value: Buffer) => User.decode(value),
  },
} as const;

export interface UsersGrpcControllerServer extends UntypedServiceImplementation {
  findOne: handleUnaryCall<FindOneRequest, User>;
  create: handleUnaryCall<CreateUserRequest, User>;
}

export interface UsersGrpcControllerClient extends Client {
  findOne(request: FindOneRequest, callback: (error: ServiceError | null, response: User) => void): ClientUnaryCall;
  findOne(
    request: FindOneRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  findOne(
    request: FindOneRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  create(request: CreateUserRequest, callback: (error: ServiceError | null, response: User) => void): ClientUnaryCall;
  create(
    request: CreateUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
  create(
    request: CreateUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: User) => void,
  ): ClientUnaryCall;
}

export const UsersGrpcControllerClient = makeGenericClientConstructor(
  UsersGrpcControllerService,
  "nest_demo.UsersGrpcController",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UsersGrpcControllerClient;
  service: typeof UsersGrpcControllerService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
