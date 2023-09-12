import Joi from 'joi';

import { truckCreateRequestBody } from './truck-create-request-body.validation-schema.js';

const truckCreate = truckCreateRequestBody.append({
  businessId: Joi.number().required().messages({
    'number.base': 'Invalid businessId.',
    'any.required': 'businessId is required.',
  }),
});

export { truckCreate };
