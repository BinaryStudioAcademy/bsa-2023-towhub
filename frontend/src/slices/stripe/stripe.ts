import {
  generateCheckoutLink,
  generateExpressAccountLink,
  getPayments,
} from './actions.js';
import { actions } from './stripe.slice.js';

const allAction = {
  ...actions,
  generateCheckoutLink,
  generateExpressAccountLink,
  getPayments,
};

export { allAction as actions };
export {
  generateCheckoutLink,
  generateExpressAccountLink,
  getPayments,
} from './actions.js';
export {
  selectCheckoutLink,
  selectExpressAccountLink,
  selectPayments,
  selectStripeDataStatus,
} from './selectors.js';
export { reducer } from './stripe.slice.js';
