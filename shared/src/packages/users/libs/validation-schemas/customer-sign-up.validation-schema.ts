import joi from 'joi';

import { type CustomerSignUpRequestDto } from '../types/types.js';
import { commonSignUpRules } from './common-rules/common-rules.js';

const customerSignUp = joi.object<CustomerSignUpRequestDto, true>(
  commonSignUpRules,
);

export { customerSignUp };
