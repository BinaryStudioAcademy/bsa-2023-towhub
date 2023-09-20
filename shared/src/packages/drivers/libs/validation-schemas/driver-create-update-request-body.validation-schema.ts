import joi from 'joi';

import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';

import {
  DriverValidationMessage as Message,
  DriverValidationRule as Rule,
} from '../enums/enums.js';
import { type DriverCreateUpdateRequestDto } from '../types/types.js';
import { checkMinMaxValidator } from './libs/helpers/heplers.js';

const driverCreateUpdateRequestBody = joi.object<
  DriverCreateUpdateRequestDto,
  true
>({
  ...commonSignUpRules,
  driverLicenseNumber: joi
    .string()
    .trim()
    // To check min/max length we must consider only significant characters,
    // thus we cannot use joi's min/max here
    .custom(
      checkMinMaxValidator(
        Rule.LICENSE_MIN_LENGTH,
        Rule.LICENSE_MAX_LENGTH,
        Rule.LICENSE_SPACERS,
      ),
    )
    .regex(Rule.LICENSE_NUMBER)
    .required()
    .messages({
      'string.empty': Message.DRIVER_LICENSE_NUMBER_REQUIRED,
      'string.pattern.base': Message.DRIVER_LICENSE_NUMBER_INVALID,
      'string.custom': Message.DRIVER_LICENSE_NUMBER_INVALID,
      'string.max': Message.DRIVER_LICENSE_NUMBER_INVALID,
    }),

  truckIds: joi.array().items(joi.number()),
});

export { driverCreateUpdateRequestBody };
