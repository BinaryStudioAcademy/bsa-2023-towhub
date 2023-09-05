import joi from 'joi';

import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/user-validation-rule.enum.js';

import { OrderStatus } from '../enums/order-status.enum.js';
import { type OrderUpdateRequestDto } from '../types/order-update-request-dto.type.js';

const orderUpdate = joi.object<OrderUpdateRequestDto, true>({
  scheduledTime: joi.string().isoDate(),
  startPoint: joi.string(),
  endPoint: joi.string(),
  driverId: joi.number().integer().positive(),
  userId: joi.number().integer().positive(),
  status: joi.string().valid(...Object.values(OrderStatus)),
  customerName: joi.string().pattern(UserValidationRule.NAME),
  customerPhone: joi.string().pattern(UserValidationRule.PHONE),
});

export { orderUpdate };
