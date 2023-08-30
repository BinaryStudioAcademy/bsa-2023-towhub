import joi from 'joi';

import { type UserSignInRequestDto } from '../types/types.js';
import { commonSignUpRules } from './common-rules/common-rules.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
  email: commonSignUpRules.email,
  password: commonSignUpRules.password,
});

export { userSignIn };
