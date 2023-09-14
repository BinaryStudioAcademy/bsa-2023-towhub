import { type DriverEntity } from '~/packages/drivers/driver.entity.js';
import { type TruckEntity } from '~/packages/trucks/truck.entity.js';
import { type UserEntity } from '~/packages/users/user.entity.js';

import { type OrderEntity } from '../../order.entity.js';

type OrderWithDriverAndTruck = {
  order: OrderEntity;
  driver: {
    asDriver: DriverEntity;
    asUser: UserEntity;
  };
  truck: TruckEntity;
};

export { type OrderWithDriverAndTruck };
