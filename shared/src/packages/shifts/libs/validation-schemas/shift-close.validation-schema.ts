import joi from 'joi';

import { ShiftValidationMessage } from '../enums/enums.js';
import { type ShiftCloseRequestDto } from '../types/types.js';

const shiftClose = joi.object<ShiftCloseRequestDto, true>({
  endDate: joi.date().required().messages({
    'date.base': ShiftValidationMessage.DATE_WRONG_FORMAT,
  }),
});

export { shiftClose };
