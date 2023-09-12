import { type Server, type Socket } from 'socket.io';

import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type TruckService } from '~/packages/trucks/truck.service.js';

import { ClientSocketEvent } from '../../types/types.js';
import { socketReleaseTruck } from '../socket-release-truck/socket-release-truck.helper.js';

const endShift = async ({
  io,
  shift,
  truckService,
}: {
  io: Server | null;
  shift: { timer?: NodeJS.Timeout; chosenTruck?: TruckEntityT; socket: Socket };
  truckService: TruckService;
}): Promise<void> => {
  const { timer, chosenTruck, socket } = shift;

  if (chosenTruck) {
    await socketReleaseTruck(chosenTruck, truckService, io);
  }

  clearTimeout(timer);

  socket.emit(ClientSocketEvent.SHIFT_ENDED);
};

export { endShift };
