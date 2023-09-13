import { type StartedShiftsStore } from '~/libs/packages/socket/libs/types/types.js';
import { type ShiftService } from '~/packages/shifts/shift.service';

const syncStartedShifts = async ({
  startedShiftsStore,
  shiftService,
}: {
  startedShiftsStore: StartedShiftsStore;
  shiftService: ShiftService;
}): Promise<void> => {
  const startedShifts = await shiftService.getAllStarted();

  for (const shift of startedShifts) {
    startedShiftsStore.set(shift.driverId, { data: { ...shift } });
  }
};

export { syncStartedShifts };
