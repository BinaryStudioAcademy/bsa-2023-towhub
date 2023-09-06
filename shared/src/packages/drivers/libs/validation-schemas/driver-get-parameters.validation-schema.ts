import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { type BusinessGetAllDriversRequestParameters } from '../types/types.js';

const driverGetParameters = joi.object<
  BusinessGetAllDriversRequestParameters,
  true
>({
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { driverGetParameters };
