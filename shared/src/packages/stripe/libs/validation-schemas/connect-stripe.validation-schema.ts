import joi from 'joi';

import { BusinessValidationMessage } from '~/index.js';

import { type SetupPaymentFormData } from '../types/types.js';

const connectStripeValidationSchema = joi.object<SetupPaymentFormData, true>({
  stripeId: joi.string().trim().required().messages({
    'string.empty': BusinessValidationMessage.stripe_id_REQUIRED,
  }),
});

export { connectStripeValidationSchema };
