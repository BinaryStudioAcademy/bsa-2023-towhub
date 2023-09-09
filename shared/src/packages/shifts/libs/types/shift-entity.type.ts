import { type UserEntityT } from '~/packages/users/users.js';

import { type TruckEntity } from '../../../../packages/trucks/trucks.js';

type ShiftEntity = {
  id: number;
  startDate: Date;
  endDate: Date | null;
  driverUserId: UserEntityT['id'];
  truckId: TruckEntity['id'];
};

export { type ShiftEntity };
