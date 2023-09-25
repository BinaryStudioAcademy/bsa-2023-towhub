import {
  calculateOrderPrice,
  createOrder,
  getDriverOrdersPage,
} from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  createOrder,
  calculateOrderPrice,
  getDriverOrdersPage,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
export { selectPrice } from './selectors.js';
