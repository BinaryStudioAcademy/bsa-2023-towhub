import joi from 'joi';

import { BusinessValidationMessage } from '~/packages/business/business.js';

import { type SetupPaymentFormData } from '../types/types.js';

const connectStripeValidationSchema = joi.object<SetupPaymentFormData, true>({
  stripeId: joi.string().trim().required().messages({
    'string.empty': BusinessValidationMessage.STRIPE_ID_REQUIRED,
  }),
});

export { connectStripeValidationSchema };
