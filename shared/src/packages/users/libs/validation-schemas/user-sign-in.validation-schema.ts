import joi from 'joi';

import { type UserSignInRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().trim().required(),
});

export { userSignIn };
