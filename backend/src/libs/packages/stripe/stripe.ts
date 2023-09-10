import { config } from '../config/config.js';
import { StripeService } from './stripe.package.js';

const stripeService = new StripeService(config.ENV);

export { stripeService };
export { type StripeService } from './stripe.package.js';
