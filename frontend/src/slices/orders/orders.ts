import { getOrders } from './actions.js';
import { actions } from './orders.slice.js';

const allActions = {
  ...actions,
  getOrders,
};

export { allActions as actions };
export { reducer } from './orders.slice.js';
