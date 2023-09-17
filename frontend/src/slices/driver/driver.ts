import { addDriver, getDriversPage } from './actions.js';
import { actions } from './driver.slice.js';

const allAction = {
  ...actions,
  getDriversPage,
  addDriver,
};

export { allAction as actions };
export { reducer } from './driver.slice.js';
