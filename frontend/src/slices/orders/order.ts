import {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  getOrder,
  getRouteData,
  removeOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
  updateOrderStatusFromSocket,
} from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  getOrder,
  getRouteData,
  removeOrder,
  subscribeOrderUpdates,
  updateOrderStatusFromSocket,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
export { selectPrice } from './selectors.js';
