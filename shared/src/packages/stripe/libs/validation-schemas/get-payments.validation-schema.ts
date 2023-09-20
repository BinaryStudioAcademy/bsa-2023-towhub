import Joi from 'joi';

import { type GetPaymentsRequest } from '../types/get-payments-request.type.js';

const dateCustomValidator = (
  value: string,
  helpers: Joi.CustomHelpers<Date>,
): Date | Joi.ErrorReport => {
  const dateObject = new Date(value);

  if (!Number.isNaN(dateObject.getTime())) {
    return dateObject;
  }

  return helpers.error('any.invalid');
};

const getPaymentsValidationSchema = Joi.object<GetPaymentsRequest>({
  businessId: Joi.number().integer(),
  orderId: Joi.number().integer(),
  userId: Joi.number().integer(),
  customerName: Joi.string(),
  customerPhone: Joi.string(),
  intervalFrom: Joi.date().iso().custom(dateCustomValidator),
  intervalTo: Joi.date().iso().custom(dateCustomValidator),
  limit: Joi.number().integer().min(1),
  page: Joi.number().integer().min(1),
});

export { getPaymentsValidationSchema };
