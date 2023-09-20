import { type FastifyInstance } from 'fastify/types/instance';
import { type Server, type Socket, Server as SocketServer } from 'socket.io';

import { type GeolocationCacheSocketService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ShiftSocketService } from '~/packages/shifts/shift.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service';

import { ServerSocketEvent } from './libs/enums/enums.js';

class SocketService {
  private io: SocketServer | null = null;

  private geolocationCacheSocketService!: GeolocationCacheSocketService;

  private userService!: UserService;

  private shiftSocketService!: ShiftSocketService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public async initializeIo({
    app,
    geolocationCacheSocketService,
    userService,
    shiftSocketService,
  }: {
    app: FastifyInstance;
    geolocationCacheSocketService: GeolocationCacheSocketService;
    userService: UserService;
    shiftSocketService: ShiftSocketService;
  }): Promise<void> {
    this.geolocationCacheSocketService = geolocationCacheSocketService;
    this.userService = userService;
    this.shiftSocketService = shiftSocketService;
    this.io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });

    await this.shiftSocketService.fetchStartedShifts();

    this.io.on(ServerSocketEvent.CONNECTION, async (socket: Socket) => {
      const socketUserId = socket.handshake.auth.userId as number | undefined;
      let user: UserEntityObjectWithGroupT | null = null;

      logger.info(`${socket.id} connected`);

      if (socketUserId) {
        user = await this.userService.findById(socketUserId);
      }

      if (user) {
        await this.shiftSocketService.initializeListeners({
          user,
          socket,
          io: this.io as Server,
        });

        this.geolocationCacheSocketService.initialize({ socket });
      }

      socket.on(ServerSocketEvent.DISCONNECT, () => {
        logger.info(`${socket.id} disconnected`);
      });
    });
  }
}

export { SocketService };
