import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';

import { type ShiftService } from '../../../shift.service.js';
import {
  type StartedShift,
  type StartedShiftsStore,
} from '../../types/types.js';

const createShift = async ({
  shiftService,
  startedShiftsStore,
  startedShift: { socket, timer },
  user,
  truckId,
}: {
  startedShiftsStore: StartedShiftsStore;
  shiftService: ShiftService;
  startedShift: Pick<StartedShift, 'socket' | 'timer'>;
  user: UserEntityObjectWithGroupT;
  truckId: TruckEntityT['id'];
}): Promise<void> => {
  const startedShift = await shiftService.create({
    user,
    body: { driverId: user.id, startDate: new Date(), truckId },
  });

  startedShiftsStore.set(user.id, {
    data: startedShift,
    timer,
    socket,
  });
};

export { createShift };
