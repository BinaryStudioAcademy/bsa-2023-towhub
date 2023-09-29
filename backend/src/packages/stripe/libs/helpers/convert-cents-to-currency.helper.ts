import { CENTS_IN_DOLLAR } from './libs/constants/constants.js';

const convertCentsToCurrency = (amount: number): number => {
  return amount / CENTS_IN_DOLLAR;
};

export { convertCentsToCurrency };
