import { type OrderResponseDto, type RootState } from '~/libs/types/types.js';

import { type RouteData } from './libs/types/types.js';

const selectOrder = (state: RootState): OrderResponseDto | null =>
  state.orders.order;
const selectOrderData = (state: RootState): RouteData => state.orders.routeData;

export { selectOrder, selectOrderData };
