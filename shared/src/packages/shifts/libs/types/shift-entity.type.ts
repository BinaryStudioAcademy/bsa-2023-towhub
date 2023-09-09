import { type DriverEntity } from '../../../../packages/drivers/drivers.js';
import { type TruckEntity } from '../../../../packages/trucks/trucks.js';

type ShiftEntity = {
  id: number;
  startDate: Date;
  endDate: Date | null;
  driverId: DriverEntity['id'];
  truckId: TruckEntity['id'];
};
export { type ShiftEntity };
