import joi from 'joi';

import { BusinessValidationMessage } from '~/packages/business/business.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverUpdateRequestParameters } from '../types/types.js';

const driverUpdateParameters = joi.object<DriverUpdateRequestParameters, true>({
  id: joi.number().integer().positive().required().messages({
    'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
  }),
  driverId: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverUpdateParameters };
