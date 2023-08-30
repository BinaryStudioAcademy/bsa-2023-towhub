import joi from 'joi';

import { type DriverSignUpRequestDto } from '../types/types.js';
import { commonSignUpRules } from './common-rules/common-rules.js';
import {
  UserValidationMessage as Message,
  UserValidationRule as Rule,
} from './enums/enums.js';
import { createPatternByRule } from './helpers/create-pattern-by-rule.js';

const userDriverSignUpRules = {
  ...commonSignUpRules,
  driverLicenseNumber: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.DRIVER_LICENSE_NUMBER))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.DRIVER_LICENSE_NUMBER,
    }),
};

const driverSignUp = joi.object<DriverSignUpRequestDto, true>(
  userDriverSignUpRules,
);

export { driverSignUp };
