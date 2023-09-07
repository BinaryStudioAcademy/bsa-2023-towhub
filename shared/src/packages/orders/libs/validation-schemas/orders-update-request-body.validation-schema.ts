import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { OrderStatus, OrdersValidationMessage } from '../enums/enums.js';
import { type OrderUpdateRequestDto } from '../types/types.js';

const orderUpdateRequestBody = joi.object<OrderUpdateRequestDto, true>({
  scheduledTime: joi.string().isoDate(),
  carsQty: joi.number().integer().positive(),
  startPoint: joi.string(),
  endPoint: joi.string(),
  driverId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.DRIVER_ID_MUST_BE_NUMBER,
  ),
  userId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.USER_ID_MUST_BE_NUMBER,
  ),
  status: joi.string().valid(...Object.values(OrderStatus)),
  customerName: joi.string().pattern(UserValidationRule.NAME),
  customerPhone: joi.string().pattern(UserValidationRule.PHONE),
});

export { orderUpdateRequestBody };
