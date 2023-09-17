import { type ShiftEntity } from '~/packages/shifts/shifts.js';
import { type TruckEntity } from '~/packages/trucks/trucks.js';

import { type DriverInfo, type OrderEntity } from './order-entity.type.js';

type OrderResponseDto = Omit<OrderEntity, 'shiftId' | 'driver' | 'truck'> & {
  shift: {
    id: ShiftEntity['id'];
    driver: DriverInfo;
    truck: Pick<TruckEntity, 'id' | 'licensePlateNumber'>;
  };
};

export { type OrderResponseDto };
