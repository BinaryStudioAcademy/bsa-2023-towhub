import joi from 'joi';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessDeleteRequestParameters } from '../types/types.js';

const businessDeleteParameters = joi.object<
  BusinessDeleteRequestParameters,
  true
>({
  id: joi.number().integer().positive().required().messages({
    'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { businessDeleteParameters };
