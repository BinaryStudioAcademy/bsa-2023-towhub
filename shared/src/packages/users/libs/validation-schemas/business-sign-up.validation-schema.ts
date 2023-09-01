import joi from 'joi';

import { type BusinessSignUpRequestDto } from '../types/types.js';
import { commonSignUpRules } from './common-rules/common-rules.js';
import {
  UserValidationMessage as Message,
  UserValidationRule as Rule,
} from './enums/enums.js';
import { createPatternByRule } from './helpers/create-pattern-by-rule.js';

const userBusinessSignUpRules = {
  ...commonSignUpRules,
  companyName: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.COMPANY_NAME))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.COMPANY_NAME_NOT_VALID,
    }),
  taxNumber: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.TAX_NUMBER))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.TAX_NUMBER_NOT_VALID,
    }),
};

const businessSignUp = joi.object<BusinessSignUpRequestDto, true>(
  userBusinessSignUpRules,
);

export { businessSignUp };
