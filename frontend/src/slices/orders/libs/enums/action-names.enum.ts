import { name as sliceName } from '~/slices/orders/orders.slice.js';

const ActionNames = {
  CHANGE_ACCEPT_ORDER_STATUS: `${sliceName}/vhange-accept-order-status`,
  SOCKET: {
    UPDATE_ORDER: `${sliceName}/socket/update-order`,
    LISTEN_ORDER_UPDATES: `${sliceName}/listen-order-updates`,
    STOP_LISTEN_ORDER_UPDATES: `${sliceName}/stop-listen-order-updates`,
  },
};

export { ActionNames };
