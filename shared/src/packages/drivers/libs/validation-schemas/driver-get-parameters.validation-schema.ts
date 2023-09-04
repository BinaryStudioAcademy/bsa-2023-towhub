import joi from 'joi';

import { BusinessValidationMessage } from '~/packages/business/business.js';

import { type DriverAllByBusinessRequestParameters } from '../types/types.js';

const driverGetParameters = joi.object<
  DriverAllByBusinessRequestParameters,
  true
>({
  id: joi.number().integer().positive().required().messages({
    'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { driverGetParameters };
