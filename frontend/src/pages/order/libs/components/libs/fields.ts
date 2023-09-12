import { type FormField } from '~/libs/types/form.type.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

const OrderFormFields: FormField<OrderCreateRequestDto>[] = [
  { label: 'Name', name: 'customerName' },
  { label: 'Phone', name: 'customerPhone' },
  { label: 'Time', name: 'scheduledTime', type: 'date' },
  { label: 'Location', name: 'startPoint', type: 'location' },
  { label: 'Destination', name: 'endPoint', type: 'location' },
  {
    label: 'How many cars need to be towed',
    name: 'carsQty',
    type: 'number',
  },
];

export { OrderFormFields };
