import joi from 'joi';

import { type GetPaymentsRequest } from '../types/get-payments-request.type.js';

const dateCustomValidator = (
  value: string,
  helpers: joi.CustomHelpers<Date>,
): Date | joi.ErrorReport => {
  const dateObject = new Date(value);

  if (!Number.isNaN(dateObject.getTime())) {
    return dateObject;
  }

  return helpers.error('any.invalid');
};

const getPaymentsValidationSchema = joi.object<GetPaymentsRequest>({
  businessId: joi.number().integer(),
  orderId: joi.number().integer(),
  userId: joi.number().integer(),
  customerName: joi.string(),
  customerPhone: joi.string(),
  intervalFrom: joi.date().iso().custom(dateCustomValidator),
  intervalTo: joi.date().iso().custom(dateCustomValidator),
  size: joi.number().integer().min(1),
  page: joi.number().integer().min(0),
});

export { getPaymentsValidationSchema };
