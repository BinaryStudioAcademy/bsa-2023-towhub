import { type Stripe } from 'stripe';

const SUPPORTED_PAYMENT_METHODS: Readonly<
  Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
> = ['card'] as const;

export { SUPPORTED_PAYMENT_METHODS };
