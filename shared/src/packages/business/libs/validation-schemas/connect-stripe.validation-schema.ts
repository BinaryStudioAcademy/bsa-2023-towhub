import joi from 'joi';

import { BusinessValidationMessage } from '~/index.js';

import { type SetupPaymentFormData } from '../types/types.js';

const connectStripeValidationSchema = joi.object<SetupPaymentFormData, true>({
  stripeKey: joi.string().trim().required().messages({
    'string.empty': BusinessValidationMessage.STRIPE_KEY_REQUIRED,
  }),
});

export { connectStripeValidationSchema };
