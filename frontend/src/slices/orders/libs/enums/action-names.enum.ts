import { name as sliceName } from '~/slices/orders/order.slice.js';

const ActionNames = {
  GET_ORDER: `${sliceName}/get-order`,
  SOCKET: {
    UPDATE_ORDER: `${sliceName}/socket/update-order`,
    SUBSCRIBE_ORDER_UPDATES: `${sliceName}/subscribe-order-updates`,
    UNSUBSCRIBE_ORDER_UPDATES: `${sliceName}/unsubscribe-order-updates`,
  },
  GET_ORDER_POINTS: `${sliceName}/get-order-points`,
};

export { ActionNames };
