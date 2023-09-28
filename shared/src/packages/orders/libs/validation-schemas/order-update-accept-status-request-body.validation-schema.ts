import joi from 'joi';

import { type OrderUpdateAcceptStatusRequestDto } from '../types/types.js';

const orderUpdateAcceptStatusRequestBody = joi.object<
  OrderUpdateAcceptStatusRequestDto,
  true
>({
  newStatus: joi.string(),
});

export { orderUpdateAcceptStatusRequestBody };
