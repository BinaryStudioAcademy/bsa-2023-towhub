import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { TruckCarsQuantity } from './enums.js';

const getCreateOrderDefaultPayload = (
  selectedTruckId: number,
): OrderCreateRequestDto => {
  return {
    customerName: '',
    customerPhone: '',
    scheduledTime: '',
    startPoint: '',
    endPoint: '',
    carsQty: TruckCarsQuantity.MIN,
    truckId: selectedTruckId,
  };
};

export { getCreateOrderDefaultPayload };
