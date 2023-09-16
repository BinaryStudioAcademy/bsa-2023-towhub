import { type OrderResponseDto, type RootState } from '~/libs/types/types.js';

import { type OrderPoints } from './libs/types/types.js';

const selectOrder = (state: RootState): OrderResponseDto | null =>
  state.orders.order;
const selectPointsNames = (state: RootState): OrderPoints =>
  state.orders.orderPoints;

export { selectOrder, selectPointsNames };
