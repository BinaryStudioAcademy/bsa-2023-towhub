import { type OrderStatusValues } from './order-status.type.js';

type OrderEntity = {
  id: number;
  price: number;
  scheduledTime: string;
  carsQty: number;
  startPoint: string;
  endPoint: string;
  status: OrderStatusValues;
  userId: number | null;
  businessId: number;
  driverId: number;
  customerName: string | null;
  customerPhone: string | null;
};

export { type OrderEntity };
