import { type Socket } from 'socket.io-client';

import { ClientSocketEvent } from './libs/enums/enums.js';
import { socket } from './socket.js';

class SocketService {
  private io: Socket;

  public constructor() {
    this.io = socket.getInstance();
  }

  public addListener(
    event: keyof typeof ClientSocketEvent,
    listener: () => void,
  ): void {
    this.io.on(ClientSocketEvent[event], listener);
  }

  public disconnect(): void {
    this.io.disconnect();
  }
}

export { SocketService };
