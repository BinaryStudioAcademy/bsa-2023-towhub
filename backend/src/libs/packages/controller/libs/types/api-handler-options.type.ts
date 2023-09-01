import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserEntityObjectWithGroupT;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: T['user'] extends unknown
    ? NonNullable<DefaultApiHandlerOptions['user']>
    : T['user'];
};

export { type ApiHandlerOptions };
