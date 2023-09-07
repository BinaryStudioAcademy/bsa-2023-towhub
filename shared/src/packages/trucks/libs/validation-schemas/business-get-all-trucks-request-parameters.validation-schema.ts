import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { type BusinessGetAllTrucksRequestParameters } from '../types/types.js';

const businessGetAllTrucksParameters = joi.object<
  BusinessGetAllTrucksRequestParameters,
  true
>({
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { businessGetAllTrucksParameters };
