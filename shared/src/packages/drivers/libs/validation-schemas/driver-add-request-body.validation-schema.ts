import joi from 'joi';

import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverAddRequestDto } from '../types/types.js';

const driverAddRequestBody = joi.object<
  Omit<DriverAddRequestDto, 'businessId'>,
  true
>({
  ...commonSignUpRules,
  driverLicenseNumber: joi
    .string()
    .trim()
    .regex(/^[A-Z]{3} \d{6}$/)
    .required()
    .messages({
      'string.empty': DriverValidationMessage.DRIVER_LICENSE_NUMBER_REQUIRED,
    }),
});

export { driverAddRequestBody };
