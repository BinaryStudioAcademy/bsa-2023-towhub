import { type DriverEntity } from '~/packages/drivers/drivers.js';

import { type OrderStatusValues } from './order-status-values.type.js';

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
  driver?: Pick<DriverEntity, 'businessId' | 'id' | 'driverLicenseNumber'> & {
    user: { firstName: string; lastName: string };
  };
};

export { type OrderEntity };
