import { type DataStatus } from '~/libs/enums/data-status.enum.js';
import {
  type OrderResponseDto,
  type RootState,
  type ValueOf,
} from '~/libs/types/types.js';

import { type RouteData } from './libs/types/types.js';

const selectPrice = (state: RootState): number => state.orders.price;

export { selectPrice };

const selectOrder = (state: RootState): OrderResponseDto | null => {
  return state.orders.currentOrder;
};
const selectOrderData = (state: RootState): RouteData => {
  return state.orders.routeData;
};
const selectDataStatus = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.orders.dataStatus;
};

export { selectDataStatus, selectOrder, selectOrderData };
