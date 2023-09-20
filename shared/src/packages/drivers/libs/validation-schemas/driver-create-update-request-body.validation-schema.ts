import joi from 'joi';

import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverCreateUpdateRequestDto } from '../types/types.js';

const driverCreateUpdateRequestBody = joi.object<
  DriverCreateUpdateRequestDto,
  true
>({
  ...commonSignUpRules,
  driverLicenseNumber: joi
    .string()
    .trim()
    .regex(UserValidationRule.DRIVER_LICENSE_NUMBER)
    .required()
    .messages({
      'string.empty': DriverValidationMessage.DRIVER_LICENSE_NUMBER_REQUIRED,
    }),

  truckIds: joi.array().items(joi.number()),
});

export { driverCreateUpdateRequestBody };
