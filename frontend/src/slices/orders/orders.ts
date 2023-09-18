import { getOrders } from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  getOrders,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
