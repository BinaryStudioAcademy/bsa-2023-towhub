import joi from 'joi';

import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';

import {
  DriverValidationMessage as Message,
  DriverValidationRule as Rule,
} from '../enums/enums.js';
import { type DriverCreateUpdateRequestDto } from '../types/types.js';

const driverCreateUpdateRequestBody = joi.object<
  DriverCreateUpdateRequestDto,
  true
>({
  ...commonSignUpRules,
  driverLicenseNumber: joi
    .string()
    .trim()
    .min(Rule.DRIVER_LICENSE_MIN_LENGTH)
    .max(Rule.DRIVER_LICENSE_MAX_LENGTH)
    .regex(Rule.DRIVER_LICENSE_NUMBER)
    .required()
    .messages({
      'string.empty': Message.DRIVER_LICENSE_NUMBER_REQUIRED,
      'string.pattern.base': Message.DRIVER_LICENSE_NUMBER_INVALID,
      'string.min': Message.DRIVER_LICENSE_NUMBER_INVALID,
      'string.max': Message.DRIVER_LICENSE_NUMBER_INVALID,
    }),

  truckIds: joi.array().items(joi.number()),
});

export { driverCreateUpdateRequestBody };
