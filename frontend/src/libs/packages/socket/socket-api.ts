import { type Socket as BaseSocket, io } from 'socket.io-client';

class Socket {
  public getInstance(): BaseSocket {
    return io('http://localhost:3001');
  }
}

export { Socket };
