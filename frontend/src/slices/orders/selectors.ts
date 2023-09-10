import {
  type OrderWithDriverEntity,
  type RootState,
} from '~/libs/types/types.js';

const selectOrder = (state: RootState): OrderWithDriverEntity | null =>
  state.orders.order;

export { selectOrder };
