import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { ShiftValidationMessage } from '../enums/enums.js';
import { type ShiftCreateRequestDto } from '../types/types.js';

const shiftCreate = joi.object<ShiftCreateRequestDto, true>({
  startDate: joi.date().required().messages({
    'date.base': ShiftValidationMessage.DATE_WRONG_FORMAT,
  }),
  truckId: positiveRequiredIntegerSchema(
    ShiftValidationMessage.ID_MUST_BE_NUMBER,
  ),
  driverId: positiveRequiredIntegerSchema(
    ShiftValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { shiftCreate };
