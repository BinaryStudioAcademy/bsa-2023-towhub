import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { logger } from '~/libs/packages/logger/logger.js';

import { ServerSocketEvents } from './libs/enums/enums.js';

class SocketService {
  private io: SocketServer | null = null;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public initializeIo(app: FastifyInstance): void {
    const io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });
    this.io = io;

    io.on(ServerSocketEvents.CONNECTION, (socket) => {
      
      logger.info(`${socket.id} connected`);
      socket.on(ServerSocketEvents.DISCONNECT, () => {
        logger.info(`${socket.id} disconnected`);
      });
    });
  }
}

export { SocketService };
