import joi from 'joi';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverDeleteRequestParameters } from '../types/types.js';

const driverDeleteParameters = joi.object<
  Omit<DriverDeleteRequestParameters, 'businessId'>,
  true
>({
  driverId: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverDeleteParameters };
