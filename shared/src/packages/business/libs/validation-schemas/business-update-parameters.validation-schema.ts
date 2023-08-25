import joi from 'joi';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessUpdateRequestParameters } from '../types/types.js';

const businessUpdateParameters = joi.object<
  BusinessUpdateRequestParameters,
  true
>({
  id: joi.number().integer().positive().required().messages({
    'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { businessUpdateParameters };
