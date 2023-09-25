import { name as sliceName } from '~/slices/orders/order.slice.js';

const ActionName = {
  GET_ORDER: `${sliceName}/get-order`,
  CHANGE_ACCEPT_ORDER_STATUS: `${sliceName}/change-accept-order-status`,
  SOCKET: {
    UPDATE_ORDER: `${sliceName}/socket/update-order`,
    SUBSCRIBE_ORDER_UPDATES: `${sliceName}/subscribe-order-updates`,
    UNSUBSCRIBE_ORDER_UPDATES: `${sliceName}/unsubscribe-order-updates`,
  },
  GET_ORDER_POINTS: `${sliceName}/get-order-points`,
} as const;

export { ActionName };
