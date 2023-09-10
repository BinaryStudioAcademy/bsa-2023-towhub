import { getOrder } from './actions.js';
import { actions } from './orders.slice.js';

const allActions = {
  ...actions,
  getOrder,
};

export { allActions as actions };
export { reducer } from './orders.slice.js';
