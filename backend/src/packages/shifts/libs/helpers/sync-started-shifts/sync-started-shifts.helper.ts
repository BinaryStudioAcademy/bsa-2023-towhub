import { type ShiftService } from '../../../shift.service.js';
import { type StartedShiftsStore } from '../../types/types.js';

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
