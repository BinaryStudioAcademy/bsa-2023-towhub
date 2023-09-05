import joi from 'joi';

import { TruckValidationMessage } from '../enums/truck-validation-message.enum.js';

const truckIdParameter = joi.object({
  id: joi.number().integer().positive().required().messages({
    'number': TruckValidationMessage.ID_NOT_A_NUMBER,
  }),
});

export { truckIdParameter };
