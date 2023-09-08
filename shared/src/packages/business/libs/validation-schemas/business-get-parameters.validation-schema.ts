import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessGetRequestParameters } from '../types/types.js';

const businessGetParameters = joi.object<BusinessGetRequestParameters, true>({
  id: positiveRequiredIntegerSchema(
    BusinessValidationMessage.OWNER_ID_MUST_BE_NUMBER,
  ),
});

export { businessGetParameters };
