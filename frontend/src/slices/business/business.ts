import { createDriver } from './actions.js';
import { actions } from './business.slice.js';

const alLActions = {
  ...actions,
  createDriver,
};

export { reducer } from './business.slice.js';
export { alLActions as actions };
