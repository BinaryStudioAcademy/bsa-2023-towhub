import joi from 'joi';

import { type OrderFindByRequestDto } from '../types/types.js';

const orderGetQueryParameters = joi.object<OrderFindByRequestDto, true>({
  driverId: joi.string(),
  userId: joi.string(),
  businessId: joi.string(),
});

export { orderGetQueryParameters };
