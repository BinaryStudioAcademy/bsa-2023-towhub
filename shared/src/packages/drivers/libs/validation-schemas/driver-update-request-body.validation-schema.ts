import joi from 'joi';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverUpdateRequestDto } from '../types/types.js';

const driverUpdateRequestBody = joi.object<DriverUpdateRequestDto, true>({
  driverLicenseNumber: joi
    .string()
    .trim()
    .regex(/^[A-Z]{3} \d{6}$/)
    .required()
    .messages({
      'string.empty': DriverValidationMessage.DRIVER_LICENSE_NUMBER_REQUIRED,
    }),
  userId: joi.number().integer().positive().required().messages({
    'number': DriverValidationMessage.USER_ID_MUST_BE_NUMBER,
  }),
});

export { driverUpdateRequestBody };
