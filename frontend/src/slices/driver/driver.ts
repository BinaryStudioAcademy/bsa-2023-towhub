import {
  chooseTruck,
  endShift,
  setShiftStatus,
  setTruckChoiceSuccess,
} from './actions.js';
import { actions } from './driver.slice.js';

const allActions = {
  ...actions,
  chooseTruck,
  setTruckChoiceSuccess,
  setShiftStatus,
  endShift,
};

export { allActions as actions };
export { reducer } from './driver.slice.js';
