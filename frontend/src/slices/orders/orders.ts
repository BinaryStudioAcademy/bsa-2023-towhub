import { getBusinessOrders, getOrdersBusiness } from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  getOrdersBusiness,
  getBusinessOrders,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
