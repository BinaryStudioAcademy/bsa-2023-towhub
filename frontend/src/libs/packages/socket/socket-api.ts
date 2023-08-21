import { type Socket as BaseSocket, io } from 'socket.io-client';

class Socket {
  public getInstance(namespace: string): BaseSocket {
    return io(namespace);
  }
}

export { Socket };
