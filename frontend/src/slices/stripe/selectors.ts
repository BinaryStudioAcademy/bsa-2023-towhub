import { type RootState } from '~/libs/types/types.js';

import { name } from './stripe.slice.js';

const selectCheckoutLink = (
  state: RootState,
): RootState[typeof name]['checkoutLink'] => {
  return state[name].checkoutLink;
};

const selectExpressAccountLink = (
  state: RootState,
): RootState[typeof name]['expressAccountLink'] => {
  return state[name].expressAccountLink;
};

const selectPayments = (
  state: RootState,
): RootState[typeof name]['payments'] => {
  return state[name].payments;
};

const selectStripeDataStatus = (
  state: RootState,
): RootState[typeof name]['dataStatus'] => state[name].dataStatus;

export {
  selectCheckoutLink,
  selectExpressAccountLink,
  selectPayments,
  selectStripeDataStatus,
};
