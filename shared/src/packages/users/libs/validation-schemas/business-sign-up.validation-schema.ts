import joi from 'joi';

import { type BusinessSignUpRequestDto } from '../types/types.js';
import { commonSignUpRules } from './common-rules/common-rules.js';
import { UserValidationMessage as Message } from './enums/user-validation-message.enum.js';
import { UserValidationRule as Rule } from './enums/user-validation-rule.enum.js';

const companyNamePattern = new RegExp(Rule.COMPANY_NAME);
const taxNumberPattern = new RegExp(Rule.TAX_NUMBER);

const userBusinessSignUpRules = {
  ...commonSignUpRules,
  companyName: joi
    .string()
    .trim()
    .required()
    .pattern(companyNamePattern)
    .messages({
      'string.empty': Message.FIElD_IS_REQUIRED,
      'string.pattern.base': Message.COMPANY_NAME_NOT_VALID,
    }),
  taxNumber: joi.string().trim().required().pattern(taxNumberPattern).messages({
    'string.empty': Message.FIElD_IS_REQUIRED,
    'string.pattern.base': Message.TAX_NUMBER_NOT_VALID,
  }),
};

const businessSignUp = joi.object<BusinessSignUpRequestDto, true>(
  userBusinessSignUpRules,
);

export { businessSignUp };
