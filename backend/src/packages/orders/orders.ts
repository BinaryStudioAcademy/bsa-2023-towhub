import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { businessService } from '../business/business.js';
import { driverService } from '../drivers/drivers.js';
import { mapService } from '../map/map.js';
import { OrderController } from './order.controller.js';
import { OrderRepository } from './order.repository.js';
import { OrderService } from './order.service.js';

const orderRepository = new OrderRepository(database, schema.orders);
const orderService = new OrderService({
  orderRepository,
  businessService,
  driverService,
});
const orderController = new OrderController({
  logger,
  orderService,
  mapService,
});

export { orderController, orderService };
