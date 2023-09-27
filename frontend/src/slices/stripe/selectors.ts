import { type RootState } from '~/libs/types/types.js';

import { name } from './stripe.slice.js';

const selectCheckoutLink = (
  state: RootState,
): RootState[typeof name]['checkoutLink'] => state[name].checkoutLink;

const selectExpressAccountLink = (
  state: RootState,
): RootState[typeof name]['expressAccountLink'] =>
  state[name].expressAccountLink;

const selectPayments = (state: RootState): RootState[typeof name]['payments'] =>
  state[name].payments;

export { selectCheckoutLink, selectExpressAccountLink, selectPayments };
