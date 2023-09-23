import { type ShiftEntityT } from 'shared/build/index.js';

import { type StartedShift } from './started-shifts-map-record.type.js';

type StartedShiftsStore = Map<ShiftEntityT['driverId'], StartedShift>;

export { type StartedShiftsStore };
