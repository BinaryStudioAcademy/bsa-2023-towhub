import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessUpdateRequestParameters } from '../types/types.js';

const businessUpdateParameters = joi.object<
  BusinessUpdateRequestParameters,
  true
>({
  id: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { businessUpdateParameters };
