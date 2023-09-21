import { type ShiftEntity } from '~/packages/shifts/shifts.js';
import { type TruckEntityT } from '~/packages/trucks/trucks.js';

import { type DriverInfo, type OrderEntity } from './order-entity.type.js';

type OrderResponseDto = Omit<OrderEntity, 'shiftId' | 'driver' | 'truck'> & {
  shift: {
    id: ShiftEntity['id'];
    driver: DriverInfo | null;
    truck: Pick<TruckEntityT, 'id' | 'licensePlateNumber'> | null;
  };
};

export { type OrderResponseDto };
