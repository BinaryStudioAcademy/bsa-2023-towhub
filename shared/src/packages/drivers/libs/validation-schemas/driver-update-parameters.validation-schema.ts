import joi from 'joi';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverUpdateRequestParameters } from '../types/types.js';

const driverUpdateParameters = joi.object<DriverUpdateRequestParameters, true>({
  driverId: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverUpdateParameters };
