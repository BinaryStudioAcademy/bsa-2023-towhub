import { type TruckEntityT } from '~/packages/trucks/trucks.js';
import { type UserEntityT } from '~/packages/users/users.js';

type ShiftEntity = {
  id: number;
  startDate: Date;
  endDate: Date | null;
  driverId: UserEntityT['id'];
  truckId: TruckEntityT['id'];
};

export { type ShiftEntity };
