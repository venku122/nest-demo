/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { User } from "../models/users";

export const protobufPackage = "nest_demo";

export interface UserCreatedEvent {
  newUser: User | undefined;
}

function createBaseUserCreatedEvent(): UserCreatedEvent {
  return { newUser: undefined };
}

export const UserCreatedEvent = {
  encode(message: UserCreatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.newUser !== undefined) {
      User.encode(message.newUser, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserCreatedEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.newUser = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserCreatedEvent {
    return { newUser: isSet(object.newUser) ? User.fromJSON(object.newUser) : undefined };
  },

  toJSON(message: UserCreatedEvent): unknown {
    const obj: any = {};
    if (message.newUser !== undefined) {
      obj.newUser = User.toJSON(message.newUser);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserCreatedEvent>, I>>(base?: I): UserCreatedEvent {
    return UserCreatedEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserCreatedEvent>, I>>(object: I): UserCreatedEvent {
    const message = createBaseUserCreatedEvent();
    message.newUser = (object.newUser !== undefined && object.newUser !== null)
      ? User.fromPartial(object.newUser)
      : undefined;
    return message;
  },
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
