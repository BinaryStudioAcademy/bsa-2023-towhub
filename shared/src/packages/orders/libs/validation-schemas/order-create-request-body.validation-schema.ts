import joi from 'joi';

import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { type OrderCreateRequestDto } from '../types/types.js';

const orderCreateRequestBody = joi.object<OrderCreateRequestDto, true>({
  scheduledTime: joi.string().isoDate().required(),
  startPoint: joi.string().required(),
  endPoint: joi.string().required(),
  driverId: joi.number().integer().positive().required(),
  customerName: joi.string().pattern(UserValidationRule.NAME).allow(null),
  customerPhone: joi.string().pattern(UserValidationRule.PHONE).allow(null),
});

export { orderCreateRequestBody };
