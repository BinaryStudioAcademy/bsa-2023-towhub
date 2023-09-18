import { type RootState } from '~/libs/types/types.js';

const selectPrice = (state: RootState): number => state.orders.price;

export { selectPrice };
