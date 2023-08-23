import joi from 'joi';

import { UserGroup } from '~/libs/enums/user-group.enum.js';

import { Regexp as REGEXP } from '../../../../libs/enums/regexp.enum.js';
import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const passwordPattern = new RegExp(REGEXP.PASSWORD);
const namePattern = new RegExp(REGEXP.NAME);
const phonePattern = new RegExp(REGEXP.PHONE);

const userSignUpRules = {
  phone: joi.string().trim().required().pattern(phonePattern).messages({
    'string.empty': UserValidationMessage.REQUIRED,
    'string.pattern.base': UserValidationMessage.PHONE_NOT_VALID,
  }),
  password: joi.string().trim().required().pattern(passwordPattern).messages({
    'string.empty': UserValidationMessage.REQUIRED,
    'string.pattern.base': UserValidationMessage.PASSWORD_NOT_VALID,
  }),
  email: joi
    .string()
    .trim()
    .min(3)
    .max(254)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': UserValidationMessage.REQUIRED,
      'string.email': UserValidationMessage.EMAIL_NOT_VALID,
      'string.min': UserValidationMessage.EMAIL_NOT_VALID,
      'string.max': UserValidationMessage.EMAIL_NOT_VALID,
    }),
  firstName: joi.string().trim().required().pattern(namePattern).messages({
    'string.empty': UserValidationMessage.REQUIRED,
    'string.pattern.base': UserValidationMessage.NAME_NOT_VALID,
  }),
  lastName: joi.string().trim().required().pattern(namePattern).messages({
    'string.empty': UserValidationMessage.REQUIRED,
    'string.pattern.base': UserValidationMessage.NAME_NOT_VALID,
  }),
  groupId: joi.number().valid(UserGroup.CUSTOMER).required(),
};

const userSignUp = joi.object<UserSignUpRequestDto, true>(userSignUpRules);

export { userSignUp, userSignUpRules };
