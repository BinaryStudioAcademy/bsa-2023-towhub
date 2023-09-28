import {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  getOrder,
  getRouteAddresses,
  getRouteData,
  getUserOrdersPage,
  removeOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
} from './actions.js';
import { actions } from './order.slice.js';

const allActions = {
  ...actions,
  getRouteAddresses,
  calculateOrderPrice,
  getUserOrdersPage,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  getOrder,
  getRouteData,
  removeOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
export { selectPrice } from './selectors.js';
