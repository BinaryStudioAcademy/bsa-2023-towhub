import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverRequestParameters } from '../types/types.js';

const driverParameters = joi.object<
  Omit<DriverRequestParameters, 'businessId'>,
  true
>({
  id: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
  driverId: positiveRequiredIntegerSchema(
    DriverValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { driverParameters };
