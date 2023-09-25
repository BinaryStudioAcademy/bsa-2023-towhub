import { type RootState } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/types/types.js';

import { type name as OrderSliceName } from './order.slice.js';

const selectPrice = (
  state: RootState,
): RootState[typeof OrderSliceName]['price'] => {
  return state.orders.price;
};

const selectOrder = (
  state: RootState,
): RootState[typeof OrderSliceName]['currentOrder'] => {
  return state.orders.currentOrder;
};

const selectOrderData = (
  state: RootState,
): RootState[typeof OrderSliceName]['routeData'] => {
  return state.orders.routeData;
};

const selectDataStatus = (
  state: RootState,
): RootState[typeof OrderSliceName]['dataStatus'] => {
  return state.orders.dataStatus;
};

const selectOrders = (state: RootState): OrderResponseDto[] =>
  state.orders.orders;

export {
  selectDataStatus,
  selectOrder,
  selectOrderData,
  selectOrders,
  selectPrice,
};
