import { type Coordinates } from '~/libs/types/types.js';
import { type DriverCommonDetails } from '~/packages/drivers/drivers.js';
import { type TruckEntityT } from '~/packages/trucks/trucks.js';
import {
  type UserCommonDetails,
  type UserEntityT,
} from '~/packages/users/users.js';

import { type OrderStatusValues } from './order-status-values.type.js';

type OrderEntity = {
  id: number;
  price: number;
  scheduledTime: string;
  carsQty: number;
  startPoint: Coordinates;
  endPoint: Coordinates;
  status: OrderStatusValues;
  userId: number | null;
  businessId: number;
  customerName: string | null;
  customerPhone: string | null;
  shiftId: number;
  driver: DriverInfo | null;
  truck: Pick<TruckEntityT, 'id' | 'licensePlateNumber'> | null;
};

type DriverInfo = DriverCommonDetails &
  UserCommonDetails &
  Pick<UserEntityT, 'id'>;

export { type DriverInfo, type OrderEntity };
