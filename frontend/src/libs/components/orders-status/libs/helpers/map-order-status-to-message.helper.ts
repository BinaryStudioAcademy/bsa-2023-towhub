import { type TruckArrivalTime } from '~/slices/trucks/types/truck-arrival-time.type.js';

import { OrderStatus } from '../enums/enums.js';
import { orderStatusToMessage } from '../maps/maps.js';
import { type OrderStatusValues } from '../types/types.js';

const mapOrderStatusToMessage = (
  status: OrderStatusValues,
  arrivalTime: TruckArrivalTime | null,
): string => {
  if (status === OrderStatus.CONFIRMED) {
    return `${orderStatusToMessage[status]} ${
      arrivalTime ? arrivalTime.text : '...'
    }`;
  }

  return orderStatusToMessage[status];
};

export { mapOrderStatusToMessage };
