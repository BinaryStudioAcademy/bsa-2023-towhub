import { OrderStatus } from '~/libs/enums/enums.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

const dropdownOptions: SelectOption[] = [
  { label: 'Pending', value: OrderStatus.PENDING },
  { label: 'On the way', value: OrderStatus.CONFIRMED },
  { label: 'Arrived', value: OrderStatus.PICKING_UP },
  { label: 'Canceled', value: OrderStatus.CANCELED },
  { label: 'Done', value: OrderStatus.DONE },
  { label: 'All', value: 'all' },
];

export { dropdownOptions };
