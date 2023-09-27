import joi from 'joi';

import { type OrderCreateFormDto } from '../types/types.js';
import { orderRules } from './common-rules/common-rules.js';

const orderCreateForm = joi.object<OrderCreateFormDto, true>({
  ...orderRules,
  startPoint: joi.string().required(),
  endPoint: joi.string().required(),
});

export { orderCreateForm };
