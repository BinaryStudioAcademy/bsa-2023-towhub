import joi from 'joi';

import { Regexp as REGEXP } from '../../../../libs/enums/regexp.enum.js';
import { UserValidationMessage } from '../enums/enums.js';
import { type UserBusinessSignUpRequestDto } from '../types/types.js';
import { userSignUpRules } from './validation-schemas.js';

const companyNamePattern = new RegExp(REGEXP.COMPANY_NAME);
const taxNumberPattern = new RegExp(REGEXP.TAX_NUMBER);

const userBusinessSignUpRules = {
  ...userSignUpRules,
  companyName: joi
    .string()
    .trim()
    .required()
    .pattern(companyNamePattern)
    .messages({
      'string.empty': UserValidationMessage.REQUIRED,
      'string.pattern.base': UserValidationMessage.COMPANY_NAME_NOT_VALID,
    }),
  taxNumber: joi.string().trim().required().pattern(taxNumberPattern).messages({
    'string.empty': UserValidationMessage.REQUIRED,
    'string.pattern.base': UserValidationMessage.TAX_NUMBER_NOT_VALID,
  }),
};

const userBusinessSignUp = joi.object<UserBusinessSignUpRequestDto, true>(
  userBusinessSignUpRules,
);

export { userBusinessSignUp };
