import {
  endShift,
  setShiftStatus,
  setStartShiftSuccess,
  startShift,
} from './actions.js';
import { actions } from './driver.slice.js';

const allActions = {
  ...actions,
  startShift,
  setStartShiftSuccess,
  setShiftStatus,
  endShift,
};

export { allActions as actions };
export { reducer } from './driver.slice.js';
