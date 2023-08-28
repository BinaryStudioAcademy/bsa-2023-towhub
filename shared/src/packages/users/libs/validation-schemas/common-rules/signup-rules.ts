import joi from 'joi';

import {
  UserValidationMessage as Message,
  UserValidationRule as Rule,
} from '../enums/enums.js';

const passwordPattern = new RegExp(Rule.PASSWORD);
const namePattern = new RegExp(Rule.NAME);
const phonePattern = new RegExp(Rule.PHONE);

const signUpRules = {
  phone: joi.string().trim().required().pattern(phonePattern).messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
    'string.pattern.base': Message.PHONE_NOT_VALID,
  }),
  password: joi.string().trim().required().pattern(passwordPattern).messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
    'string.pattern.base': Message.PASSWORD_NOT_VALID,
  }),
  email: joi
    .string()
    .trim()
    .min(Rule.EMAIL_MIN_LENGTH)
    .max(Rule.EMAIL_MAX_LENGTH)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': Message.FIELD_IS_REQUIRED,
      'string.email': Message.EMAIL_NOT_VALID,
      'string.min': Message.EMAIL_NOT_VALID,
      'string.max': Message.EMAIL_NOT_VALID,
    }),
  firstName: joi.string().trim().required().pattern(namePattern).messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
    'string.pattern.base': Message.NAME_NOT_VALID,
  }),
  lastName: joi.string().trim().required().pattern(namePattern).messages({
    'string.empty': Message.FIELD_IS_REQUIRED,
    'string.pattern.base': Message.NAME_NOT_VALID,
  }),
};

export { signUpRules };
