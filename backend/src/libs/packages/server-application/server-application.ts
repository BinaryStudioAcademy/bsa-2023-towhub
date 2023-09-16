import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';
import { businessController } from '~/packages/business/business.js';
import { orderController } from '~/packages/orders/orders.js';
import {
  shiftController,
  shiftSocketService,
} from '~/packages/shifts/shift.js';
import { truckController, truckService } from '~/packages/trucks/trucks.js';
import { userController, userService } from '~/packages/users/users.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  config,
  ...authController.routes,
  ...userController.routes,
  ...businessController.routes,
  ...truckController.routes,
  ...shiftController.routes,
  ...orderController.routes,
);

const serverApp = new ServerApp({
  config,
  logger,
  database,
  apis: [apiV1],
  truckService,
  geolocationCacheService: GeolocationCacheService.getInstance(),
  userService,
  shiftSocketService,
});

export { type ServerAppRouteParameters } from './libs/types/types.js';
export { serverApp };
