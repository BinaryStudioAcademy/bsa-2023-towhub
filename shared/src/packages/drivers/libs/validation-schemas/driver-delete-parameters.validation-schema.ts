import joi from 'joi';

import { BusinessValidationMessage } from '~/packages/business/business.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverDeleteRequestParameters } from '../types/types.js';

const driverDeleteParameters = joi.object<
  Omit<DriverDeleteRequestParameters, 'businessId'>,
  true
>({
  id: joi.number().integer().positive().required().messages({
    'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
  }),
  driverId: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverDeleteParameters };
