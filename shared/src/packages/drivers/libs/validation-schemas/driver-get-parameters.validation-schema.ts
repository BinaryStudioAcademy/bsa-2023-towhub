import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { type DriverAllByBusinessRequestParameters } from '../types/types.js';

const driverGetParameters = joi.object<
  DriverAllByBusinessRequestParameters,
  true
>({
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { driverGetParameters };
