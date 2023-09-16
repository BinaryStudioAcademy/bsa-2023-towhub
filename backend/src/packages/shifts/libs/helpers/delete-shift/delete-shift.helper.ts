import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

import { type ShiftService } from '../../../shift.service.js';
import { type StartedShiftsStore } from '../../types/types.js';

const deleteShift = async ({
  shiftService,
  startedShiftsStore,
  user,
}: {
  shiftService: ShiftService;
  startedShiftsStore: StartedShiftsStore;
  user: UserEntityObjectWithGroupT;
}): Promise<void> => {
  const shift = startedShiftsStore.get(user.id);

  if (!shift) {
    return;
  }

  const {
    data: { id },
  } = shift;

  await shiftService.close({
    body: { endDate: new Date() },
    params: { id },
    user,
  });

  startedShiftsStore.delete(user.id);
};

export { deleteShift };
