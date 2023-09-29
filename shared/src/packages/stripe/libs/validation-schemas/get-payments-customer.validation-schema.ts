import joi from 'joi';

import { getPaymentsValidationSchema } from './get-payments.validation-schema.js';

const getPaymentsCustomerValidationSchema = getPaymentsValidationSchema.keys({
  userId: joi.forbidden(),
});

export { getPaymentsCustomerValidationSchema };
