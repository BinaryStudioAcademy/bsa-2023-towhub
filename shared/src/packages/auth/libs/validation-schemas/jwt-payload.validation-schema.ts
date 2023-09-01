import joi from 'joi';

import { type UserEntityT } from '~/packages/users/users.js';

const jwtPayloadSchema = joi
  .object<Pick<UserEntityT, 'id'>, true>({
    id: joi.number().required(),
  })
  .required();

export { jwtPayloadSchema };
