import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';

import {
  type ClientToServerEvents,
  type ServerToClientEvents,
} from './libs/types/types.js';

class SocketService {
  private io!: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

  public connect(): void {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      config.ENV.API.SERVER_URL,
      {
        transports: ['websocket', 'polling'],
      },
    );
    this.io = socket;
  }

  public getInstance():
    | Socket<ServerToClientEvents, ClientToServerEvents>
    | undefined {
    return this.io;
  }

  public addListener(
    event: keyof ServerToClientEvents,
    listener: () => void,
  ): void {
    this.io?.on(event, listener);
  }

  public emit<EventT extends keyof ClientToServerEvents>(
    event: EventT,
    eventPayloadParameters: Parameters<ClientToServerEvents[EventT]>,
  ): void {
    this.io?.emit(event, ...eventPayloadParameters);
  }

  public disconnect(): void {
    this.io?.disconnect();
  }
}

export { SocketService };
