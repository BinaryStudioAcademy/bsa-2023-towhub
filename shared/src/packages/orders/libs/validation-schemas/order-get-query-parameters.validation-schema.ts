import joi from 'joi';

import { type OrderFindByRequestDto } from '../types/types.js';

const orderGetQueryParameters = joi.object<OrderFindByRequestDto, true>({
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

export { orderGetQueryParameters };
