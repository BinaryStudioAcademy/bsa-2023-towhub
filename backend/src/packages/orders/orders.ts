import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { socket } from '~/libs/packages/socket/socket.js';

import { businessService } from '../business/business.js';
import { driverService } from '../drivers/drivers.js';
import { OrderController } from './order.controller.js';
import { OrderRepository } from './order.repository.js';
import { OrderService } from './order.service.js';

const orderRepository = new OrderRepository(database, schema.orders);
const orderService = new OrderService({
  orderRepository,
  businessService,
  driverService,
  socket,
});
const orderController = new OrderController({
  logger,
  orderService,
});

export { orderController, orderService };
