import { type DataStatus } from '~/libs/enums/data-status.enum';
import { type RootState, type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/types/types.js';

const selectPrice = (state: RootState): number => state.orders.price;
const selectOrders = (
  state: RootState,
): {
  orders: OrderResponseDto[];
  total: number;
  dataStatus: ValueOf<typeof DataStatus>;
} => state.orders;

export { selectOrders, selectPrice };
