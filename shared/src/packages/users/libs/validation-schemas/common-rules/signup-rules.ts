import joi from 'joi';

import {
  UserValidationMessage as Message,
  UserValidationRule as Rule,
} from '../enums/enums.js';
import { createPatternByRule } from '../helpers/create-pattern-by-rule.js';

const signUpRules = {
  phone: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.PHONE))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.PHONE_NOT_VALID,
    }),
  password: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.PASSWORD))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.PASSWORD_NOT_VALID,
    }),
  email: joi
    .string()
    .trim()
    .min(Rule.EMAIL_MIN_LENGTH)
    .max(Rule.EMAIL_MAX_LENGTH)
    .email({ tlds: { allow: false }, ignoreLength: true })
    .required()
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.email': Message.EMAIL_NOT_VALID,
      'string.min': Message.EMAIL_NOT_VALID,
      'string.max': Message.EMAIL_NOT_VALID,
    }),
  firstName: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.NAME))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.NAME_NOT_VALID,
    }),
  lastName: joi
    .string()
    .trim()
    .required()
    .pattern(createPatternByRule(Rule.NAME))
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.pattern.base': Message.NAME_NOT_VALID,
    }),
};

export { signUpRules };
