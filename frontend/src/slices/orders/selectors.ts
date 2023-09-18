import { type OrderResponseDto, type RootState } from '~/libs/types/types.js';

import { type RouteData } from './libs/types/types.js';

const selectPrice = (state: RootState): number => state.orders.price;

export { selectPrice };

const selectOrder = (state: RootState): (OrderResponseDto | undefined)[] =>
  state.orders.orders;
const selectOrderData = (state: RootState): RouteData => state.orders.routeData;

export { selectOrder, selectOrderData };
