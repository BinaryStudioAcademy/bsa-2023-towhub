import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { TruckCarsQuantity } from './enums.js';

const getCurrentDate = (): string => {
  const currentDatetime = new Date();

  return currentDatetime.toISOString().slice(0, 16);
};

const getCreateOrderDefaultPayload = (
  selectedTruckId: number,
): OrderCreateRequestDto => {
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
