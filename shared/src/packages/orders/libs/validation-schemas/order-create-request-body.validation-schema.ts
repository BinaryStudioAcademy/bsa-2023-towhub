import joi from 'joi';

import { type OrderCreateRequestDto } from '../types/types.js';
import { orderRules } from './common-rules/common-rules.js';

const orderCreateRequestBody = joi.object<OrderCreateRequestDto, true>({
  ...orderRules,
  startPoint: joi.object().required(),
  endPoint: joi.object().required(),
});

export { orderCreateRequestBody };
