import joi from 'joi';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessGetRequestParameters } from '../types/types.js';

const businessGetParametersValidationSchema = joi.object<
  BusinessGetRequestParameters,
  true
>({
  id: joi.number().required().messages({
    'number': BusinessValidationMessage.OWNER_ID_MUST_BE_NUMBER,
  }),
});

export { businessGetParametersValidationSchema };
