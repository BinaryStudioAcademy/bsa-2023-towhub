import joi from 'joi';

import {
  UserValidationMessage as Message,
  UserValidationRules as Rules,
} from '../enums/enums.js';

const passwordPattern = new RegExp(Rules.PASSWORD);
const namePattern = new RegExp(Rules.NAME);
const phonePattern = new RegExp(Rules.PHONE);

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
    .min(5)
    .max(254)
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
