import {
  type OrderFindByIdResponseDto,
  type RootState,
} from '~/libs/types/types.js';

const selectOrder = (state: RootState): OrderFindByIdResponseDto | null =>
  state.orders.order;

export { selectOrder };
