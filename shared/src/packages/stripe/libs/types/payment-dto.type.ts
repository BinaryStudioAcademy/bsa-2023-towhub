import { type CheckoutMetadata } from './checkout-metadata.type.js';

type PaymentDto = CheckoutMetadata & {
  amount: number;
  currency: string;
  timestamp: Date;
};

export { type PaymentDto };
