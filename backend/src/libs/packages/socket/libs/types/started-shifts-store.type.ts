import { type StartedShift } from '~/libs/packages/socket/libs/types/started-shifts-map-record.type';
import { type ShiftEntityT } from '~/packages/shifts/libs/types/types.js';

type StartedShiftsStore = Map<ShiftEntityT['driverId'], StartedShift>;

export { type StartedShiftsStore };
