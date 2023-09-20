import {
  calculateOrderPrice,
  createOrder,
  getOrder,
  getRouteData,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
} from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  createOrder,
  calculateOrderPrice,
  getOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
  getRouteData,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
export { selectPrice } from './selectors.js';
