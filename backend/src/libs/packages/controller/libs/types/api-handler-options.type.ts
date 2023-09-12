import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';

import { type DefaultApiHandlerOptions } from './default-api-handler-options.type.js';

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: undefined extends T['user'] ? UserEntityObjectWithGroupT : T['user'];
};

export { type ApiHandlerOptions };
