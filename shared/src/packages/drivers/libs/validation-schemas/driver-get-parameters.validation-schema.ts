import joi from 'joi';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverGetRequestParameters } from '../types/types.js';

const driverGetParameters = joi.object<DriverGetRequestParameters, true>({
  driverId: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverGetParameters };
