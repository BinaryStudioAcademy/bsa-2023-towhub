import { type ShiftService } from '~/packages/shifts/shift.service';
import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';

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
