import { getDriversPage } from './actions.js';
import { actions } from './driver-table.slice.js';

const allAction = {
  ...actions,
  getDriversPage,
};

export { allAction as actions };
export { reducer } from './driver-table.slice.js';
