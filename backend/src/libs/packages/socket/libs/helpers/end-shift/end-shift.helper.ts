import { type Server, type Socket } from 'socket.io';

import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type TruckService } from '~/packages/trucks/truck.service.js';

import { ClientSocketEvent } from '../../types/types.js';

const endShift = async ({
  socket,
  io,
  truck,
  timer,
  truckService,
}: {
  socket: Socket;
  io: Server | null;
  truck: TruckEntityT;
  timer: NodeJS.Timer;
  truckService: TruckService;
}): Promise<void> => {
  await truckService.update(truck.id, {
    status: TruckStatus.AVAILABLE,
  });

  clearTimeout(timer);

  io?.emit(ClientSocketEvent.TRUCK_AVAILABLE, { truckId: truck.id });

  socket.emit(ClientSocketEvent.SHIFT_ENDED);
};

export { endShift };
