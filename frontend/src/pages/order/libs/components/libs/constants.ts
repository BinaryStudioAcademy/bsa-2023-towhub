import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

const CREATE_ORDER_DEFAULT_PAYLOAD: Omit<OrderCreateRequestDto, 'driverId'> = {
  customerName: '',
  customerPhone: '',
  scheduledTime: '',
  startPoint: '',
  endPoint: '',
  carsQty: 1,
};

export { CREATE_ORDER_DEFAULT_PAYLOAD };
