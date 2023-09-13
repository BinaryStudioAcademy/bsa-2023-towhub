import { createAction } from '@reduxjs/toolkit';

import { name as sliceName } from './driver.slice.js';
import { type ShiftStatusValue } from './libs/types/types.js';

const endShift = createAction(`${sliceName}/end-shift`);
const setStartShiftSuccess = createAction(
  `${sliceName}/set-start-shift-success`,
  (truckId: number) => {
    return { payload: { truckId } };
  },
);

const startShift = createAction(
  `${sliceName}/start-shift`,
  (truckId: number) => {
    return {
      payload: { truckId },
    };
  },
);

const setShiftStatus = createAction(
  `${sliceName}/set-shift-status`,
  (shiftStatus: ShiftStatusValue) => {
    return { payload: { shiftStatus } };
  },
);

export { endShift, setShiftStatus, setStartShiftSuccess, startShift };
