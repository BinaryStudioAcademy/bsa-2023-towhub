import { type Server } from 'socket.io';

import { ServerToClientEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type TruckService } from '~/packages/trucks/truck.service.js';

const socketChooseTruck = async (
  truckId: TruckEntityT['id'],
  truckService: TruckService,
  io: Server | null,
): Promise<void> => {
  await truckService.update(truckId, {
    status: TruckStatus.ACTIVE,
  });

  io?.emit(ServerToClientEvent.TRUCK_CHOSEN, { truckId });
};

export { socketChooseTruck };
