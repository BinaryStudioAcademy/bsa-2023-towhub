import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverRequestParameters } from '../types/types.js';

const driverParameters = joi.object<DriverRequestParameters, true>({
  driverId: positiveRequiredIntegerSchema(
    DriverValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { driverParameters };
