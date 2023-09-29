import { type Stripe } from 'stripe';

import { type CheckoutMetadata } from './types.js';

type PaymentIntentWithMetadata = Stripe.PaymentIntent & {
  metadata: CheckoutMetadata;
};

export { type PaymentIntentWithMetadata };
