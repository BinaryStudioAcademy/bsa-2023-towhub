import { type OrderCreateFormDto } from '~/packages/orders/libs/types/types.js';

import { TruckCarsQuantity } from './enums.js';

const getCurrentDate = (): string => {
  const currentDatetime = new Date();

  return currentDatetime.toISOString();
};

const getCreateOrderDefaultPayload = (
  selectedTruckId: number,
): OrderCreateFormDto => {
  return {
    customerName: '',
    customerPhone: '',
    scheduledTime: getCurrentDate(),
    startPoint: '',
    endPoint: '',
    carsQty: TruckCarsQuantity.MIN,
    truckId: selectedTruckId,
  };
};

export { getCreateOrderDefaultPayload };
