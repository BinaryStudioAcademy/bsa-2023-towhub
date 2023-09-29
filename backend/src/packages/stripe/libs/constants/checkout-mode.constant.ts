import { type Stripe } from 'stripe';

const CHECKOUT_MODE: Stripe.Checkout.SessionCreateParams.Mode = 'payment';

export { CHECKOUT_MODE };
