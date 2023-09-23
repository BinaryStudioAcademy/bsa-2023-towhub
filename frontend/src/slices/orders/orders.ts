import { getOrdersBusiness } from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  getOrdersBusiness,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
