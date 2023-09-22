import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';
import { type ValueOf } from '~/libs/types/types.js';

import {
  type ClientSocketEvent,
  type ServerSocketEvent,
} from './libs/enums/enums.js';
import {
  type ClientSocketEventValue,
  type ServerSocketEventParameter,
  type ServerSocketEventValue,
} from './libs/types/types.js';

class SocketService {
  private io: Socket | undefined;

  public connect(): void {
    if (!this.io) {
      this.io = io(config.ENV.API.SERVER_URL, {
        transports: ['websocket', 'polling'],
      });
    }
  }

  public addListener(
    event: ClientSocketEventValue | ServerSocketEventValue,
    listener: (payload?: unknown) => void,
  ): void {
    this.io?.on(event, listener);
  }

  public emit<T extends keyof ServerSocketEventParameter>({
    event,
    eventPayload,
  }: {
    event:
      | ValueOf<typeof ServerSocketEvent>
      | ValueOf<typeof ClientSocketEvent>;
    eventPayload?: ServerSocketEventParameter[T];
  }): void {
    this.io?.emit(event, eventPayload);
  }

  public disconnect(): void {
    this.io?.disconnect();
  }
}

export { SocketService };
