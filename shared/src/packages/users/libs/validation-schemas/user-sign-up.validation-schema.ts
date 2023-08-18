import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  phone: joi.string().trim().required().messages({
    'string.empty': UserValidationMessage.PHONE_REQUIRED,
  }),
  password: joi.string().trim().required(),
});

export { userSignUp };
