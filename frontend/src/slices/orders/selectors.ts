import { type RootState } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/types/types.js';

const selectPrice = (state: RootState): number => state.orders.price;
const selectOrders = (state: RootState): OrderResponseDto[] =>
  state.orders.orders;

export { selectOrders, selectPrice };
