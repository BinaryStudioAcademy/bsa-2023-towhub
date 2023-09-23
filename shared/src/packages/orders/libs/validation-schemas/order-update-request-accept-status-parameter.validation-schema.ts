import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { OrdersValidationMessage } from '../enums/enums.js';
import { type OrderUpdateAcceptStatusRequsetParameter } from '../types/types.js';

const orderUpdateAcceptStatusRequestParameter = joi.object<
  OrderUpdateAcceptStatusRequsetParameter,
  true
>({
  orderId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { orderUpdateAcceptStatusRequestParameter };
