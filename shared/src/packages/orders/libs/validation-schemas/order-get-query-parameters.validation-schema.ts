import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { OrdersValidationMessage } from '../enums/orders-validation-message.enum.js';
import { type OrderFindByRequestDto } from '../types/types.js';

const orderGetQueryParameters = joi.object<OrderFindByRequestDto, true>({
  driverId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.DRIVER_ID_MUST_BE_NUMBER,
  ),
  userId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.USER_ID_MUST_BE_NUMBER,
  ),
  businessId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.BUSINESS_ID_MUST_BE_NUMBER,
  ),
});

export { orderGetQueryParameters };
