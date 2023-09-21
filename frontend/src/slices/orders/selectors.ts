import { type DataStatus } from '~/libs/enums/data-status.enum.js';
import {
  type OrderResponseDto,
  type RootState,
  type ValueOf,
} from '~/libs/types/types.js';

import { type RouteData } from './libs/types/types.js';

const selectPrice = (state: RootState): number => state.orders.price;

export { selectPrice };

const selectOrder = (state: RootState): (OrderResponseDto | undefined)[] =>
  state.orders.orders;
const selectOrderData = (state: RootState): RouteData => state.orders.routeData;
const selectDataStatus = (state: RootState): ValueOf<typeof DataStatus> =>
  state.orders.dataStatus;

export { selectDataStatus, selectOrder, selectOrderData };
