import { type UserMocked } from './user-mocked.type.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserMocked;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: T['user'];
};

export { type ApiHandlerOptions };
