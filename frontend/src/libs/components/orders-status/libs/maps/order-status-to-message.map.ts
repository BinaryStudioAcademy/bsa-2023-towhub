import { OrderStatus } from '../enums/order-status.enum.js';

const orderStatusToMessage = {
  [OrderStatus.PENDING]: 'Please wait for your order to be confirmed',
  [OrderStatus.CANCELED]:
    'The order has been canceled, please select another vehicle',
  [OrderStatus.CONFIRMED]: 'Driver on the way! Approximate waiting time:',
  [OrderStatus.PICKING_UP]: 'The driver has arrived, please, pay your order!',
  [OrderStatus.DONE]: 'Thank you for your order!',
};

export { orderStatusToMessage };
