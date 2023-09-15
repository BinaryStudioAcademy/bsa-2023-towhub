import { type DriverEntity } from '~/packages/drivers/drivers.js';
import { type TruckEntity } from '~/packages/trucks/trucks.js';
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
  businessId: number | null;
  customerName: string | null;
  customerPhone: string | null;
  shift: { id: number };
  driver:
    | (Pick<UserEntityT, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'> &
        Pick<DriverEntity, 'driverLicenseNumber'>)
    | null;
  truck: Pick<TruckEntity, 'id' | 'licensePlateNumber'> | null;
};

export { type OrderEntity };
