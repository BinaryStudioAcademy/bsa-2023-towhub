import { type Stripe } from 'stripe';

type WebhookBody = {
  stripeWebhookEvent: Stripe.DiscriminatedEvent;
};

export { type WebhookBody };
