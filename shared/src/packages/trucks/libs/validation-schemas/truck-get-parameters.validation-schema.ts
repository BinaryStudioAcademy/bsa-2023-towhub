import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/common-schemas/positive-required-integer-schema.validation-schema.js';

import { TruckValidationMessage } from '../enums/truck-validation-message.enum.js';
import { type TruckrGetRequestParameters } from '../types/truck-get-request-parameters.type.js';

const truckGetParameters = joi.object<TruckrGetRequestParameters, true>({
  id: positiveRequiredIntegerSchema(TruckValidationMessage.ID_NOT_A_NUMBER),
});

export { truckGetParameters };
