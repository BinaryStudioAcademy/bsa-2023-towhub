import { CENTS_IN_DOLLAR } from './libs/consts/cents-in-dollar.const.js';

const inCents = (amount: number): number => {
  return amount * CENTS_IN_DOLLAR;
};

export { inCents };
