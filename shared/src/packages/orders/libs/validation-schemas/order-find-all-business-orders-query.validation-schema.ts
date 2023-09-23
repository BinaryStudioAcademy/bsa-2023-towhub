import joi from 'joi';

import { CommonValidationMessage } from '~/libs/enums/validation-message.enum.js';

import { OrderStatus } from '../enums/order-status.enum.js';
import { type OrderQueryParameters } from '../types/types.js';

const orderFindAllBusinessOrdersQuery = joi.object<OrderQueryParameters, true>({
  status: joi.string().valid(...Object.values(OrderStatus), 'all'),
  size: joi.number().min(0).messages({
    'number.base': CommonValidationMessage.PAGE_SIZE_MUST_BE_NUMBER,
  }),
  page: joi.number().min(0).messages({
    'number.base': CommonValidationMessage.PAGE_INDEX_MUST_BE_NUMBER,
  }),
});

export { orderFindAllBusinessOrdersQuery };
