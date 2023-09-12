import { createOrder } from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  createOrder,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
