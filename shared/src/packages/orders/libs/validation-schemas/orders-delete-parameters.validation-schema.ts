import joi from 'joi';

import { type Id } from '~/libs/types/route-parameters.type.js';

import { OrdersValidationMessage } from '../enums/enums.js';

const ordersDeleteParameters = joi.object<Id, true>({
  id: joi.number().integer().positive().required().messages({
    'number': OrdersValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { ordersDeleteParameters };
