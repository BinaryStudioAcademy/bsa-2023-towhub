import { type DriverEntity } from '~/packages/drivers/drivers.js';
import { type ShiftEntity } from '~/packages/shifts/shifts.js';
import { type TruckEntity } from '~/packages/trucks/trucks.js';
import { type UserEntityT } from '~/packages/users/users.js';

import { type OrderEntity } from './order-entity.type.js';

type OrderResponseDto = Omit<OrderEntity, 'shift' | 'driver' | 'truck'> & {
  shift: {
    id: ShiftEntity['id'];
    driver:
      | (Pick<
          UserEntityT,
          'id' | 'firstName' | 'lastName' | 'email' | 'phone'
        > &
          Pick<DriverEntity, 'driverLicenseNumber'>)
      | null;
    truck: Pick<TruckEntity, 'id' | 'licensePlateNumber'> | null;
  };
};

export { type OrderResponseDto };
