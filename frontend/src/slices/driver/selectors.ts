import { type RootState } from '~/libs/types/store.type';

import {
  type ShiftStatusValue,
  type TruckChoiceStatus,
} from './libs/types/types.js';

const selectTruckChoiceStatus = (state: RootState): TruckChoiceStatus => {
  return state.driver.truckChoiceStatus;
};

const selectActiveTruckId = (state: RootState): number | null => {
  return state.driver.activeTruckId;
};

const selectShiftStatus = (state: RootState): ShiftStatusValue => {
  return state.driver.shiftStatus;
};

export { selectActiveTruckId, selectShiftStatus, selectTruckChoiceStatus };
