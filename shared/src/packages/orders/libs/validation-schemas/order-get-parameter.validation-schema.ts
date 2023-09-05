import joi from 'joi';

import { type Id } from '~/libs/types/types.js';

import { OrdersValidationMessage } from '../enums/enums.js';

const orderGetParameter = joi.object<Id, true>({
  id: joi.number().integer().positive().required().messages({
    'number': OrdersValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { orderGetParameter };
