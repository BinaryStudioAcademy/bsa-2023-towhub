import { type Socket as BaseSocket, io } from 'socket.io-client';

import { config } from '~/libs/packages/config/config.js';

class Socket {
  public getInstance(): BaseSocket {
    return io(config.ENV.API.SERVER_URL);
  }
}

const socket = new Socket();

export { socket };
