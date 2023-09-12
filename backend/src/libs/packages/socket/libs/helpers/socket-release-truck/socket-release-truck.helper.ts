import { type Server } from 'socket.io';

import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type TruckService } from '~/packages/trucks/truck.service.js';

import { ClientSocketEvent } from '../../enums/enums.js';

const socketReleaseTruck = async (
  truck: TruckEntityT,
  truckService: TruckService,
  io: Server | null,
): Promise<void> => {
  const { id: truckId } = truck;
  await truckService.update(truckId, {
    status: TruckStatus.AVAILABLE,
  });

  io?.emit(ClientSocketEvent.TRUCK_AVAILABLE, { truckId });
};

export { socketReleaseTruck };
