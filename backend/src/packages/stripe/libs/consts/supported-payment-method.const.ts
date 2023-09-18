import { type Stripe } from 'stripe';

const SUPPORTED_PAYMENT_METHOD: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] =
  ['card'];

export { SUPPORTED_PAYMENT_METHOD };
