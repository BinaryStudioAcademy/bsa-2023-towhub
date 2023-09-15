import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/common-schemas/positive-required-integer-schema.validation-schema.js';

import { TruckValidationMessage } from '../enums/truck-validation-message.enum.js';

const userTrucksRequestBody = joi.object({
  userId: positiveRequiredIntegerSchema(TruckValidationMessage.ID_NOT_A_NUMBER),

  trucksId: joi
    .array()
    .items(
      positiveRequiredIntegerSchema(TruckValidationMessage.ID_NOT_A_NUMBER),
    ),
});

export { userTrucksRequestBody };
