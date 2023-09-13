import joi from 'joi';

import { TruckValidationMessage } from '../enums/truck-validation-message.enum.js';

const userTrucksRequestBody = joi.object({
  userId: joi.number().required().messages({
    'any.only': TruckValidationMessage.INVALID,
    'any.required': TruckValidationMessage.REQUIRED,
  }),

  trucksId: joi.array().items(joi.number()),
});

export { userTrucksRequestBody };
