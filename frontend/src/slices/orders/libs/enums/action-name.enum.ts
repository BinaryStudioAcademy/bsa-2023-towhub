import { name as sliceName } from '~/slices/orders/order.slice.js';

const ActionName = {
  GET_ORDER: `${sliceName}/get-order`,
  SOCKET: {
    UPDATE_ORDER: `${sliceName}/socket/update-order`,
    SUBSCRIBE_ORDER_UPDATES: `${sliceName}/subscribe-order-updates`,
    UNSUBSCRIBE_ORDER_UPDATES: `${sliceName}/unsubscribe-order-updates`,
  },
  GET_ORDER_POINTS: `${sliceName}/get-order-points`,
  GET_ORDER_ADDRESSES: `${sliceName}/get-order-addresses`,
} as const;

export { ActionName };
