import {
  changeAcceptOrderStatus,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
} from './actions.js';
import { actions } from './orders.slice.js';

const allActions = {
  ...actions,
  changeAcceptOrderStatus,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
};

export { allActions as actions };
export { reducer } from './orders.slice.js';
