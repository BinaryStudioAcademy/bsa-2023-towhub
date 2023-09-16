import { type TruckEntityT } from '~/packages/trucks/trucks.js';

import { type OrderEntityT } from './order-entity.type.js';

type OrderUpdateRequestDto = Partial<
  Omit<
    OrderEntityT,
    'id' | 'businessId' | 'price' | 'shiftId' | 'driver' | 'truck'
  > & {
    truckId: TruckEntityT['id'];
  }
>;

export { type OrderUpdateRequestDto };
