import joi from 'joi';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessUpdateRequestDto } from '../types/types.js';

const businessUpdateRequestBody = joi.object<BusinessUpdateRequestDto, true>({
  companyName: joi.string().trim().required().messages({
    'string.empty': BusinessValidationMessage.COMPANY_NAME_REQUIRED,
  }),
});

export { businessUpdateRequestBody };
