import { config } from '~/libs/packages/config/config.js';

const calculateApplicationFee = (amount: number): number => {
  return amount * config.ENV.BUSINESS.APPLICATION_FEE_AMOUNT;
};

export { calculateApplicationFee };
