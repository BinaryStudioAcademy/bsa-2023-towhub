import { addDriver, getDriversPage } from './actions.js';
import { actions } from './drivers.slice.js';

const allAction = {
  ...actions,
  getDriversPage,
  addDriver,
};

export { allAction as actions };
export { reducer } from './drivers.slice.js';
