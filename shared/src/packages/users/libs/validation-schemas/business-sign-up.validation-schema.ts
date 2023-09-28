import joi from 'joi';

import { businessCommonRules } from '~/packages/business/libs/validation-schemas/common-rules/common-rules.js';

import { type BusinessSignUpRequestDto } from '../types/types.js';
import { commonSignUpRules } from './common-rules/common-rules.js';

const userBusinessSignUpRules = {
  ...commonSignUpRules,
  ...businessCommonRules,
};

const businessSignUp = joi.object<BusinessSignUpRequestDto, true>(
  userBusinessSignUpRules,
);

export { businessSignUp };
