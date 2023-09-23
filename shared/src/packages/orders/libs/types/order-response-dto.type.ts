import { type ShiftEntityT } from '~/packages/shifts/shifts.js';
import { type TruckEntityT } from '~/packages/trucks/trucks.js';

import { type DriverInfo, type OrderEntityT } from './order-entity.type.js';

type OrderResponseDto = Omit<OrderEntityT, 'shiftId' | 'driver' | 'truck'> & {
  shift: {
    id: ShiftEntityT['id'];
    driver: DriverInfo | null;
    truck: Pick<TruckEntityT, 'id' | 'licensePlateNumber'> | null;
  };
};

export { type OrderResponseDto };
