import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

class SocketService {
  private io: SocketServer | null = null;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public initialiseIo(app: FastifyInstance): void {
    this.io = new SocketServer(app.server);
  }
}

export { SocketService };
