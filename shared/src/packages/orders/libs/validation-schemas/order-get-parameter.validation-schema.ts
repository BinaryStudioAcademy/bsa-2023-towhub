import joi from 'joi';

import { type Id } from '~/libs/types/types.js';
import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { OrdersValidationMessage } from '../enums/enums.js';

const orderGetParameter = joi.object<Id, true>({
  id: positiveRequiredIntegerSchema(OrdersValidationMessage.ID_MUST_BE_NUMBER),
});

export { orderGetParameter };
