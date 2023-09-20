import { type RootState } from '~/libs/packages/store/store.js';
import { type TruckEntityT } from '~/slices/trucks/libs/types/types.js';

import {
  type ShiftStatusValue,
  type TruckChoiceStatus,
} from './libs/types/types.js';

const selectTruckChoiceStatus = (state: RootState): TruckChoiceStatus => {
  return state.driver.truckChoiceStatus;
};

const selectActiveTruck = (state: RootState): TruckEntityT | null => {
  return state.driver.activeTruck;
};

const selectShiftStatus = (state: RootState): ShiftStatusValue => {
  return state.driver.shiftStatus;
};

export { selectActiveTruck, selectShiftStatus, selectTruckChoiceStatus };
