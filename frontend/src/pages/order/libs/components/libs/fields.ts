import { type FormField } from '~/libs/types/form.type.js';
import { type LocationChangeHandler } from '~/libs/types/types.js';
import { type OrderCreateFormDto } from '~/packages/orders/libs/types/types.js';

import { TruckCarsQuantity } from './enums.js';

const getOrderFormFields = (
  onStartChange: LocationChangeHandler,
  onEndChange: LocationChangeHandler,
): FormField<OrderCreateFormDto>[] => [
  { label: 'Name', name: 'customerName' },
  { label: 'Phone', name: 'customerPhone' },
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
