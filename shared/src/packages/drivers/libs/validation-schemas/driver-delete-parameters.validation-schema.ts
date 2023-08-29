import joi from 'joi';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverDeleteRequestParameters } from '../types/types.js';

const driverDeleteParameters = joi.object<DriverDeleteRequestParameters, true>({
  id: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverDeleteParameters };
