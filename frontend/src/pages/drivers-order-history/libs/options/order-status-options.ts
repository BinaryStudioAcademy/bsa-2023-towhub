import { type SelectOption } from '~/libs/types/select-option.type';

import { OrderStatus } from '../enums/enums.js';

const orderStatusOptions: SelectOption[] = [
  { label: 'Any', value: '' },
  { label: 'Done', value: OrderStatus.DONE },
  { label: 'Pending', value: OrderStatus.PENDING },
  { label: 'Canceled', value: OrderStatus.CANCELED },
  { label: 'Rejected', value: OrderStatus.REJECTED },
  { label: 'Confirmed', value: OrderStatus.CONFIRMED },
  { label: 'Picking up', value: OrderStatus.PICKING_UP },
];

export { orderStatusOptions };
