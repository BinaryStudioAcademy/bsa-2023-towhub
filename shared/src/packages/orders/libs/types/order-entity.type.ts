import { type OrderStatus } from './order-status.type.js';

type OrderEntity = {
  id: number;
  price: number;
  scheduledTime: string;
  startPoint: string;
  endPoint: string;
  status: OrderStatus;
  userId: number;
  businessId: number;
  driverId: number;
  customerName?: string;
  customerPhone?: string;
};

export { type OrderEntity };
