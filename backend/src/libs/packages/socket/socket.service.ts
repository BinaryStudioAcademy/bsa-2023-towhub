import { type FastifyInstance } from 'fastify/types/instance';
import { type Server, type Socket, Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ShiftSocketService } from '~/packages/shifts/shift.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service';

import { ServerSocketEvent } from './libs/enums/enums.js';
import { type ServerSocketEventParameter } from './libs/types/types.js';

class SocketService {
  private io: SocketServer | null = null;

  private geolocationCacheService!: GeolocationCacheService;

  private userService!: UserService;

  private shiftSocketService!: ShiftSocketService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public async initializeIo({
    app,
    geolocationCacheService,
    userService,
    shiftSocketService,
  }: {
    app: FastifyInstance;
    geolocationCacheService: GeolocationCacheService;
    userService: UserService;
    shiftSocketService: ShiftSocketService;
  }): Promise<void> {
    this.geolocationCacheService = geolocationCacheService;
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
        this.shiftSocketService.initialize({
          user,
          socket,
          io: this.io as Server,
        });
      }

      socket.on(ServerSocketEvent.DISCONNECT, () => {
        logger.info(`${socket.id} disconnected`);
      });

      socket.on(
        ServerSocketEvent.TRUCK_LOCATION_UPDATE,
        (
          payload: ServerSocketEventParameter[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATE],
        ): void => {
          const { truckId, latLng } = payload;
          this.geolocationCacheService.setCache(truckId, latLng);
        },
      );
    });
  }
}

export { SocketService };
