import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { logger } from '~/libs/packages/logger/logger.js';

class SocketService {
  private io: SocketServer | null = null;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public initialiseIo(app: FastifyInstance): void {
    const io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });
    this.io = io;

    io.on('connection', (socket) => {
      logger.info(`${socket.id} successfully connected`);
      socket.on('disconnect', () => {
        logger.info('disconnect');
      });
    });
  }
}

export { SocketService };
