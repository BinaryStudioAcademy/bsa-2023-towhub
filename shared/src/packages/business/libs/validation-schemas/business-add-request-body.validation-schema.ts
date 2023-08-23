import joi from 'joi';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessAddRequestDto } from '../types/types.js';

const businessAddRequestBody = joi.object<BusinessAddRequestDto, true>({
  companyName: joi.string().trim().required().messages({
    'string.empty': BusinessValidationMessage.COMPANY_NAME_REQUIRED,
  }),
  taxNumber: joi
    .string()
    .trim()
    .regex(/^\d{10}$/)
    .required()
    .messages({
      'string.empty': BusinessValidationMessage.TAX_NUMBER_REQUIRED,
    }),
});

export { businessAddRequestBody };
