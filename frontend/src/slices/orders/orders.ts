import { getBusinessOrders } from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  getBusinessOrders,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
