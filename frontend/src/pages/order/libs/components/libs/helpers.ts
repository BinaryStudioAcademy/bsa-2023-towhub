import { type OrderCreateFormDto } from '~/packages/orders/libs/types/types.js';

import { TruckCarsQuantity } from './enums.js';

const getCreateOrderDefaultPayload = (
  selectedTruckId: number,
): OrderCreateFormDto => {
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
