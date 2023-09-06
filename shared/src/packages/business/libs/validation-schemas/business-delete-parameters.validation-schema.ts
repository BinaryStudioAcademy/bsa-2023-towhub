import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { BusinessValidationMessage } from '../enums/enums.js';
import { type BusinessDeleteRequestParameters } from '../types/types.js';

const businessDeleteParameters = joi.object<
  BusinessDeleteRequestParameters,
  true
>({
  id: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { businessDeleteParameters };
