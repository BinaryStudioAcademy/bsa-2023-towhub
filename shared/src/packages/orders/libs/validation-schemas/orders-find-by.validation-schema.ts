import joi from 'joi';

import { type OrderFindByRequestDto } from '../types/order-find-by-request-dto.type.js';

const orderFindBy = joi.object<OrderFindByRequestDto, true>({
  price: joi.string(),
  scheduledTime: joi.string(),
  startPoint: joi.string(),
  endPoint: joi.string(),
  driverId: joi.string(),
  customerName: joi.string(),
  customerPhone: joi.string(),
  status: joi.string(),
  userId: joi.string(),
  businessId: joi.string(),
});

export { orderFindBy };
