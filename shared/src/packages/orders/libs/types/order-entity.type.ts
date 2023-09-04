import { type OrderStatus } from './order-status.type.js';

type OrderEntity = {
  id: number;
  price: number;
  scheduledTime: string;
  startPoint: string;
  endPoint: string;
  status: OrderStatus;
  userId: number | null;
  businessId: number;
  driverId: number;
  customerName: string | null;
  customerPhone: string | null;
};

export { type OrderEntity };
