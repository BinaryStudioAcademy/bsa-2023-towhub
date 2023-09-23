import { type Server } from 'socket.io';

import { ServerToClientEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type TruckService } from '~/packages/trucks/truck.service.js';

const socketReleaseTruck = async (
  truckId: number,
  truckService: TruckService,
  io: Server | null,
): Promise<void> => {
  await truckService.update(truckId, {
    status: TruckStatus.AVAILABLE,
  });

  io?.emit(ServerToClientEvent.TRUCK_AVAILABLE, { truckId });
};

export { socketReleaseTruck };
