import { type Stripe } from 'stripe';

const ONBOARDING_LINK_TYPE: Stripe.AccountLinkCreateParams.Type =
  'account_onboarding';

export { ONBOARDING_LINK_TYPE };
