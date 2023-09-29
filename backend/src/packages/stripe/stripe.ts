import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { businessService } from '../business/business.js';
import { mapService } from '../map/map.js';
import { truckService } from '../trucks/trucks.js';
import { StripeController } from './stripe.controller.js';
import { StripeService } from './stripe.service.js';

const stripeService = new StripeService({
  config: config.ENV,
  businessService,
  truckService,
  mapService,
});
const stripeController = new StripeController(logger, stripeService);

export { stripeController, stripeService };
export { PaymentEntity } from './payment.entity.js';
export { type StripeService } from './stripe.service.js';
