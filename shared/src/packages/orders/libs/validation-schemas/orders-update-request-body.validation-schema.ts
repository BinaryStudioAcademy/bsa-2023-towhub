import joi from 'joi';

import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { OrderStatus, OrdersValidationMessage } from '../enums/enums.js';
import { type OrderUpdateRequestDto } from '../types/types.js';

const orderUpdateRequestBody = joi.object<OrderUpdateRequestDto, true>({
  scheduledTime: joi.string().isoDate(),
  carsQty: joi.number().integer().positive(),
  startPoint: joi.string(),
  endPoint: joi.string(),
  truckId: joi.number().integer().positive(),
  userId: joi.number().integer().positive().messages({
    'number': OrdersValidationMessage.USER_ID_MUST_BE_NUMBER,
  }),
  status: joi.string().valid(...Object.values(OrderStatus)),
  customerName: joi.string().pattern(UserValidationRule.NAME),
  customerPhone: joi.string().pattern(UserValidationRule.PHONE),
});

export { orderUpdateRequestBody };
