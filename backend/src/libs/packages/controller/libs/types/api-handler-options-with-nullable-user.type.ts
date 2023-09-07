import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

import { type DefaultApiHandlerOptions } from './default-api-handler-options.type.js';

type ApiHandlerOptionsWithNullableUser<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: UserEntityObjectWithGroupT | null;
};

export { type ApiHandlerOptionsWithNullableUser };
