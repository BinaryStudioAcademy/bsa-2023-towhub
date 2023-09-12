import { type ValueOf } from 'shared/build/index.js';
import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';

import {
  type ClientToServerEvents,
  type ServerToClientEvents,
} from './libs/types/types.js';

class SocketService {
  private io: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

  public connect(): void {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      config.ENV.API.SERVER_URL,
      {
        transports: ['websocket', 'polling'],
      },
    );
    this.io = socket;
  }

  public addListener(
    event: keyof ServerToClientEvents,
    listener: () => void,
  ): void {
    this.io?.on(event, listener);
  }

  public emit(
    event: keyof ClientToServerEvents,
    eventPayload: Parameters<ValueOf<ClientToServerEvents>>[0],
  ): void {
    this.io?.emit(event, eventPayload);
  }

  public disconnect(): void {
    this.io?.disconnect();
  }
}

export { SocketService };
