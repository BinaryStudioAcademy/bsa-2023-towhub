import { type TruckArrivalTime } from '~/slices/trucks/types/truck-arrival-time.type.js';

import { OrderStatus } from '../enums/order-status.enum.js';
import { orderStatusToMessage } from '../maps/order-status-to-message.map.js';
import { type OrderStatusValues } from '../types/types.js';

const getStatusMessageMapper = (
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

export { getStatusMessageMapper };
