import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { OrdersValidationMessage } from '../enums/orders-validation-message.enum.js';
import { type OrderCreateRequestDto } from '../types/types.js';

const orderForm = joi.object<Omit<OrderCreateRequestDto, 'driverId'>, true>({
  scheduledTime: joi.string().isoDate().required(),
  carsQty: positiveRequiredIntegerSchema(
    OrdersValidationMessage.CARS_QTY_MUST_BE_NUMBER,
  ),
  startPoint: joi.string().required(),
  endPoint: joi.string().required(),
  customerName: joi.string().pattern(UserValidationRule.NAME).allow(null),
  customerPhone: joi.string().pattern(UserValidationRule.PHONE).allow(null),
});

export { orderForm };
