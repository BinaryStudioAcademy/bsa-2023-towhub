import { type Socket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';

import { ClientSocketEvent } from './libs/enums/enums.js';

class SocketService {
  private io: Socket | undefined;

  public connect(): void {
    this.io = io(config.ENV.API.SERVER_URL);
  }

  public addListener(
    event: keyof typeof ClientSocketEvent,
    listener: () => void,
  ): void {
    this.io?.on(ClientSocketEvent[event], listener);
  }

  public disconnect(): void {
    this.io?.disconnect();
  }
}

export { SocketService };
