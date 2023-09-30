import joi from 'joi';

import {
  UserValidationMessage as Message,
  UserValidationRule as Rule,
} from '~/packages/users/libs/validation-schemas/enums/enums.js';
import { createPatternByRule } from '~/packages/users/libs/validation-schemas/helpers/helpers.js';

const businessCommonRules = {
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
  stripeId: joi.string().trim(),
  isStripeActivated: joi.boolean(),
};

export { businessCommonRules };
