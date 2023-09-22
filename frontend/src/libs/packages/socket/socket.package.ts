import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';
import {
  type UserEntityObjectWithGroupT,
  type ValueOf,
} from '~/libs/types/types.js';

import {
  type ClientToServerEvent,
  type ServerToClientEvent,
  type ServerToClientResponseStatus,
} from './libs/enums/enums.js';
import {
  type ClientToServerEventParameter,
  type ServerToClientEventParameter,
  type ServerToClientEventResponse,
} from './libs/types/types.js';

class SocketService {
  private io: Socket | null = null;

  public hasListeners<
    T extends
      keyof ServerToClientEventParameter = keyof ServerToClientEventParameter,
  >(event: T): boolean {
    return this.io ? this.io.hasListeners(event) : false;
  }

  public connect(user: UserEntityObjectWithGroupT | null): void {
    if (!this.io) {
      const auth = user ? { userId: user.id } : {};
      this.io = io(config.ENV.API.SERVER_URL, {
        transports: ['websocket', 'polling'],
        auth,
      });
    }
  }

  public addListener<
    T extends
      keyof ServerToClientEventParameter = keyof ServerToClientEventParameter,
  >(
    event: T,
    listener: (payload: ServerToClientEventParameter[T]) => void,
  ): void {
    this.io?.on(event as string, listener);
  }

  public removeAllListeners<
    T extends
      keyof ServerToClientEventParameter = keyof ServerToClientEventParameter,
  >(event: T): void {
    this.io?.removeAllListeners(event);
  }

  public emit<T extends keyof ClientToServerEventParameter>({
    event,
    eventPayload,
  }: {
    event:
      | ValueOf<typeof ClientToServerEvent>
      | ValueOf<typeof ServerToClientEvent>;
    eventPayload?: ClientToServerEventParameter[T];
  }): void {
    this.io?.emit(event, eventPayload);
  }

  public emitWithAck<T extends keyof ServerToClientEventResponse>({
    event,
    eventPayload,
    callback,
  }: {
    event: T;
    eventPayload: ClientToServerEventParameter[T];
    callback: (
      status: ValueOf<typeof ServerToClientResponseStatus>,
      response: ServerToClientEventResponse[T],
    ) => void;
  }): void {
    this.io?.emit(event, eventPayload, callback);
  }

  public disconnect(): void {
    this.io?.disconnect();
    this.io = null;
  }
}

export { SocketService };
