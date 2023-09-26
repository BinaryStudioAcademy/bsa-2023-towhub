import { OrderStatus } from '~/libs/enums/enums.js';

const dropdownOptions = [
  { label: 'Pending', value: OrderStatus.PENDING },
  { label: 'On the way', value: OrderStatus.CONFIRMED },
  { label: 'Arrived', value: OrderStatus.PICKING_UP },
  { label: 'Canceled', value: OrderStatus.CANCELED },
  { label: 'Done', value: OrderStatus.DONE },
  { label: 'All', value: 'all' },
];

export { dropdownOptions };
