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
  selectCheckoutLink,
  selectExpressAccountLink,
  selectPayments,
} from './selectors.js';
export { reducer } from './stripe.slice.js';
