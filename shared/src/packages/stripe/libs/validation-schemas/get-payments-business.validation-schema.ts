import joi from 'joi';

import { getPaymentsValidationSchema } from './get-payments.validation-schema.js';

const getPaymentsBusinessValidationSchema = getPaymentsValidationSchema.keys({
  businessId: joi.forbidden(),
});

export { getPaymentsBusinessValidationSchema };
