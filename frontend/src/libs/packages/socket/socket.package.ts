import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';
import {
  type UserEntityObjectWithGroupT,
  type ValueOf,
} from '~/libs/types/types.js';

import { type SocketResponseStatus } from './libs/enums/enums.js';
import {
  type ClientSocketEventParameter,
  type ServerSocketEventParameter,
  type ServerSocketEventResponse,
} from './libs/types/types.js';

class SocketService {
  private io: Socket | undefined;

  public connect(user: UserEntityObjectWithGroupT | null): void {
    const auth = user ? { userId: user.id } : {};
    this.io = io(config.ENV.API.SERVER_URL, {
      transports: ['websocket', 'polling'],
      auth,
    });
  }

  public addListener<
    T extends
      keyof ClientSocketEventParameter = keyof ClientSocketEventParameter,
  >(
    event: T,
    listener: (payload?: ClientSocketEventParameter[T]) => void,
  ): void {
    this.io?.on(event as string, listener);
  }

  public emit<T extends keyof ServerSocketEventParameter>({
    event,
    eventPayload,
  }: {
    event: T;
    eventPayload: ServerSocketEventParameter[T];
  }): void {
    this.io?.emit(event, eventPayload);
  }

  public emitWithAck<T extends keyof ServerSocketEventResponse>({
    event,
    eventPayload,
    callback,
  }: {
    event: T;
    eventPayload: ServerSocketEventParameter[T];
    callback: (
      status: ValueOf<typeof SocketResponseStatus>,
      response: ServerSocketEventResponse[T],
    ) => void;
  }): void {
    this.io?.emit(event, eventPayload, callback);
  }

  public disconnect(): void {
    this.io?.disconnect();
  }
}

export { SocketService };
