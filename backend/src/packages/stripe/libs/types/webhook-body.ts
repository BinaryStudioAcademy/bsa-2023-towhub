import { type Stripe } from 'stripe';

type WebhookBody = {
  stripeWebhookEvent: Stripe.Event;
};

export { type WebhookBody };
