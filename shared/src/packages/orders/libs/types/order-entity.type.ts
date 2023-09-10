import { type DriverEntity } from '~/packages/drivers/drivers.js';
import { type UserEntityT } from '~/packages/users/users.js';

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
  driver?: Pick<DriverEntity, 'driverLicenseNumber'> & {
    user: {
      firstName: UserEntityT['firstName'];
      lastName: UserEntityT['lastName'];
    };
  };
};

export { type OrderEntity };
