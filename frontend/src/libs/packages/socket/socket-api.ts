import { type Socket as BaseSocket, io } from 'socket.io-client';

class Socket {
  public getInstance(namespace?: string | undefined): BaseSocket {
    return io(`http://localhost:3001${namespace ?? ''}`);
  }
}

export { Socket };
