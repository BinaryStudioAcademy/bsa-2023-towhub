import { type CheckoutMetadata } from './checkout-metadata.type.js';

type PaymentDto = {
  amount: number;
  currency: string;
  timestamp: Date;
} & CheckoutMetadata;

export { type PaymentDto };
