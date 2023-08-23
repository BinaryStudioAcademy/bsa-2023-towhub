import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  name: joi.string().trim().required(),
  surname: joi.string().trim().required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: joi.string().trim().required().messages({
    'string.empty': UserValidationMessage.PHONE_REQUIRED,
  }),
  password: joi.string().trim().required(),
  email: joi.string().trim().email().required(),
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  groupId: joi.number().required(),
});

export { userSignUp };
