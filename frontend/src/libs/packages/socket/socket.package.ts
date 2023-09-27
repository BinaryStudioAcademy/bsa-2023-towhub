import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';
import { type FirstParameter } from '~/libs/types/types.js';

import {
  type ClientToServerEvent,
  type ServerToClientEvent,
} from './libs/enums/enums.js';
import {
  type ClientToServerEventParameter,
  type ServerToClientEventParameter,
  type ServerToClientEventResponse,
} from './libs/types/types.js';

class SocketService {
  private io!: Socket<
    ServerToClientEventParameter,
    ClientToServerEventParameter
  > | null;

  public hasListeners<
    T extends
      keyof ServerToClientEventParameter = keyof ServerToClientEventParameter,
  >(event: T): boolean {
    return this.io ? this.io.hasListeners(event) : false;
  }

  public connect(): void {
    if (!this.io) {
      this.io = io(config.ENV.API.SERVER_URL, {
        transports: ['websocket', 'polling'],
      });
    }
  }

  public checkIsConnected(): boolean {
    return this.io?.connected ?? false;
  }

  public addListener<
    T extends
      keyof ServerToClientEventParameter = keyof ServerToClientEventParameter,
  >(event: T, listener: ServerToClientEventParameter[T]): void {
    this.io?.on(
      event as typeof ServerToClientEvent.BASE_EVENT,
      listener as ServerToClientEventParameter[typeof ServerToClientEvent.BASE_EVENT],
    );
  }

  public removeAllListeners<
    T extends
      keyof ServerToClientEventParameter = keyof ServerToClientEventParameter,
  >(event: T): void {
    this.io?.removeAllListeners(event);
  }

  public emit<
    T extends
      keyof ClientToServerEventParameter = keyof ClientToServerEventParameter,
  >({
    event,
    eventPayload,
  }: {
    event: T;
    eventPayload?: FirstParameter<ClientToServerEventParameter[T]>;
  }): void {
    this.io?.emit(event as typeof ClientToServerEvent.BASE_EVENT, eventPayload);
  }

  public emitWithAck<
    T extends
      keyof ClientToServerEventParameter = keyof ClientToServerEventParameter,
    R extends keyof ServerToClientEventResponse = Extract<
      T,
      keyof ServerToClientEventResponse
    >,
  >({
    event,
    eventPayload,
  }: {
    event: T;
    eventPayload?: FirstParameter<ClientToServerEventParameter[T]>;
  }): Promise<ServerToClientEventResponse[R]> | undefined {
    return this.io?.emitWithAck(
      event as typeof ClientToServerEvent.BASE_EVENT,
      eventPayload,
    );
  }

  public disconnect(): void {
    this.io?.disconnect();
    this.io = null;
  }

  public getInstance(): Socket<
    ServerToClientEventParameter,
    ClientToServerEventParameter
  > | null {
    return this.io;
  }
}

export { SocketService };
