import {
  endShift,
  setShiftStatus,
  setStartShiftSuccess,
  shiftEnded,
  startShift,
} from './actions.js';
import { actions } from './driver.slice.js';

const allActions = {
  ...actions,
  endShift,
  setShiftStatus,
  setStartShiftSuccess,
  shiftEnded,
  startShift,
};

export { allActions as actions };
export { reducer } from './driver.slice.js';
