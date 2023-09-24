import joi from 'joi';

import { businessCommonRules } from '~/packages/business/libs/validation-schemas/common-rules/common-rules.js';

import { type BusinessEditDto } from '../types/types.js';
import { commonEditRules } from './common-rules/common-rules.js';

const userBusinessEditRules = {
  ...commonEditRules,
  ...businessCommonRules,
};

const businessEdit = joi.object<BusinessEditDto, true>(userBusinessEditRules);

export { businessEdit };
