import {
  getOrder,
  getRouteData,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
} from './actions.js';
import { actions } from './orders.slice.js';

const allActions = {
  ...actions,
  getOrder,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
  getRouteData,
};

export { allActions as actions };
export { reducer } from './orders.slice.js';
