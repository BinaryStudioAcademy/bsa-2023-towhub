import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverUpdateDeleteRequestParameters } from '../types/types.js';

const driverUpdateDeleteParameters = joi.object<
  DriverUpdateDeleteRequestParameters,
  true
>({
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
  driverId: positiveRequiredIntegerSchema(
    DriverValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { driverUpdateDeleteParameters };
