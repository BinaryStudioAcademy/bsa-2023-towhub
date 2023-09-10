import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { businessService } from '../business/business.js';
import { StripeController } from './stripe.controller.js';
import { StripeRepository } from './stripe.repository.js';
import { StripeService } from './stripe.service.js';

const stripeRepository = new StripeRepository(config.ENV);
const stripeService = new StripeService(stripeRepository, businessService);
const stripeController = new StripeController(logger, stripeService);

export { stripeController, stripeRepository, stripeService };
export { type StripeService } from './stripe.service.js';
