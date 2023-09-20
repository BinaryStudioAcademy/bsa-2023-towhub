import Joi from 'joi';

import { getPaymentsValidationSchema } from './get-payments.validation-schema.js';

const getPaymentsCustomerValidationSchema = getPaymentsValidationSchema.keys({
  userId: Joi.forbidden(),
});

export { getPaymentsCustomerValidationSchema };
