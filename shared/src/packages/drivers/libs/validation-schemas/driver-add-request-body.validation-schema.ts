import joi from 'joi';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverAddRequestDto } from '../types/types.js';

const driverAddRequestBody = joi.object<DriverAddRequestDto, true>({
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

export { driverAddRequestBody };
