import { type TruckEntity } from '~/packages/trucks/trucks.js';

import { type OrderEntity } from './order-entity.type.js';

type OrderUpdateRequestDto = Partial<
  Omit<
    OrderEntity,
    'id' | 'businessId' | 'price' | 'shiftId' | 'driver' | 'truck'
  > & {
    truckId: TruckEntity['id'];
  }
>;

export { type OrderUpdateRequestDto };
