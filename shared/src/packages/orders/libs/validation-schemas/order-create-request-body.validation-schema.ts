import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { OrdersValidationMessage as Message } from '../enums/orders-validation-message.enum.js';
import { type OrderCreateRequestDto } from '../types/types.js';

const orderCreateRequestBody = joi.object<OrderCreateRequestDto, true>({
  scheduledTime: joi.string().isoDate().required().messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
  }),
  carsQty: positiveRequiredIntegerSchema(
    Message.CARS_QTY_MUST_BE_NUMBER,
  ).messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
  }),
  startPoint: joi.string().required().messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
  }),
  endPoint: joi.string().required().messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
  }),
  truckId: positiveRequiredIntegerSchema(
    Message.TRUCK_ID_MUST_BE_NUMBER,
  ).messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
  }),
  customerName: joi
    .string()
    .pattern(UserValidationRule.NAME)
    .allow(null)
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.NAME_NOT_VALID,
    }),
  customerPhone: joi
    .string()
    .pattern(UserValidationRule.PHONE)
    .allow(null)
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.PHONE_NOT_VALID,
    }),
});

export { orderCreateRequestBody };
