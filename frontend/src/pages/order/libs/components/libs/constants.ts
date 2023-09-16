import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

const CREATE_ORDER_DEFAULT_PAYLOAD: OrderCreateRequestDto = {
  customerName: '',
  customerPhone: '',
  scheduledTime: '',
  startPoint: '',
  endPoint: '',
  carsQty: 1,
  truckId: 0,
};

export { CREATE_ORDER_DEFAULT_PAYLOAD };
