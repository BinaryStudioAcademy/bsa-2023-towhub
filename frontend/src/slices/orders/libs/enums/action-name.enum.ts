import { name as sliceName } from '~/slices/orders/order.slice.js';

const ActionName = {
  GET_ORDER: `${sliceName}/get-order`,
  REMOVE_ORDER: `${sliceName}/remove-order`,
  CHANGE_ACCEPT_ORDER_STATUS: `${sliceName}/change-accept-order-status`,
  SOCKET: {
    CREATE_ORDER: `${sliceName}/socket/create-order`,
    UPDATE_ORDER: `${sliceName}/socket/update-order`,
    UPDATE_ORDER_STATUS: `${sliceName}/socket/update-order-status`,
    SUBSCRIBE_ORDER_UPDATES: `${sliceName}/subscribe-order-updates`,
    UNSUBSCRIBE_ORDER_UPDATES: `${sliceName}/unsubscribe-order-updates`,
  },
  GET_ORDER_POINTS: `${sliceName}/get-order-points`,
} as const;

export { ActionName };
