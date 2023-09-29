import {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  createOrderFromSocket,
  getBusinessOrders,
  getDriverOrdersPage,
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
  getBusinessOrders,
  createOrderFromSocket,
  getOrder,
  getRouteData,
  removeOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
  getDriverOrdersPage,
};

export { allActions as actions };
export { reducer } from './order.slice.js';
export { selectPrice } from './selectors.js';
