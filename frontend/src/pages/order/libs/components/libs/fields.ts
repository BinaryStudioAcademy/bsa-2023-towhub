import { type FormField } from '~/libs/types/form.type.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

const getOrderFormFields = (
  onStartChange: (place: google.maps.LatLngLiteral, address: string) => void,
  onEndChange: (place: google.maps.LatLngLiteral, address: string) => void,
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
  },
];

export { getOrderFormFields };
