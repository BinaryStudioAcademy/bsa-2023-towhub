import { CENTS_IN_DOLLAR } from './libs/constants/constants.js';

const convertCurrencyToCents = (amount: number): number => {
  return amount * CENTS_IN_DOLLAR;
};

export { convertCurrencyToCents };
