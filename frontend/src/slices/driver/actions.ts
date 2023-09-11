import { createAction } from '@reduxjs/toolkit';

import { name as sliceName } from './driver.slice.js';
import { type ShiftStatusValue } from './libs/types/types.js';

const chooseTruck = createAction(
  `${sliceName}/choose-truck`,
  (truckId: number) => {
    return {
      payload: { truckId },
    };
  },
);
const endShift = createAction(`${sliceName}/end-shift`);
const setTruckChoiceSuccess = createAction(
  `${sliceName}/choose-truck-success`,
  (truckId: number) => {
    return { payload: { truckId } };
  },
);

const setShiftStatus = createAction(
  `${sliceName}/set-shift-status`,
  (shiftStatus: ShiftStatusValue) => {
    return { payload: { shiftStatus } };
  },
);

export { chooseTruck, endShift, setShiftStatus, setTruckChoiceSuccess };
