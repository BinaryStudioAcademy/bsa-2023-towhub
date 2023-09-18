import { name as sliceName } from '~/slices/orders/order.slice.js';

const ActionNames = {
  GET_ORDER: `${sliceName}/get-order`,
  SOCKET: {
    UPDATE_ORDER: `${sliceName}/socket/update-order`,
    LISTEN_ORDER_UPDATES: `${sliceName}/listen-order-updates`,
    STOP_LISTEN_ORDER_UPDATES: `${sliceName}/stop-listen-order-updates`,
  },
  GET_ORDER_POINTS: `${sliceName}/get-order-points`,
};

export { ActionNames };
