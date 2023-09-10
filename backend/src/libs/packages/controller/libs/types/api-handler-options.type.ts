import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: unknown;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: undefined extends T['user'] ? UserEntityObjectWithGroupT : T['user'];
};

export { type ApiHandlerOptions };
