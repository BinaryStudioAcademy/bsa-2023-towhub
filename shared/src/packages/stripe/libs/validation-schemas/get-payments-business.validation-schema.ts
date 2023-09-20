import Joi from 'joi';

import { getPaymentsValidationSchema } from './get-payments.validation-schema.js';

const getPaymentsBusinessValidationSchema = getPaymentsValidationSchema.keys({
  businessId: Joi.forbidden(),
});

export { getPaymentsBusinessValidationSchema };
