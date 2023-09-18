import { OrderStatus } from './order-status.enum.js';

const STATUS_MESSAGES = {
  [OrderStatus.PENDING]: 'Please wait for your order to be confirmed',
  [OrderStatus.CANCELED]:
    'The order has been canceled, please select another vehicle',
  [OrderStatus.CONFIRMED]: 'Driver on the way! Approximate waiting time:',
  [OrderStatus.PICKING_UP]: 'The driver has arrived, please, pay your order!',
  [OrderStatus.DONE]: 'Thank you for your order!',
};

export { STATUS_MESSAGES };
