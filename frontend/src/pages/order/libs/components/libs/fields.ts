import { type FormField } from '~/libs/types/form.type.js';
import { type LocationChangeHandler } from '~/libs/types/location-change-handler.type.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { TruckCarsQuantity } from './enums.js';

const getOrderFormFields = (
  onStartChange: LocationChangeHandler,
  onEndChange: LocationChangeHandler,
): FormField<OrderCreateRequestDto>[] => [
  { label: 'Name', name: 'customerName' },
  { label: 'Phone', name: 'customerPhone' },
  { label: 'Time', name: 'scheduledTime', type: 'date' },
  {
    label: 'Location',
    name: 'startPoint',
    type: 'location',
    onLocationChange: onStartChange,
  },
  {
    label: 'Destination',
    name: 'endPoint',
    type: 'location',
    onLocationChange: onEndChange,
  },
  {
    label: 'How many cars need to be towed',
    name: 'carsQty',
    type: 'number',
    min: TruckCarsQuantity.MIN,
    max: TruckCarsQuantity.MAX,
  },
];

export { getOrderFormFields };
