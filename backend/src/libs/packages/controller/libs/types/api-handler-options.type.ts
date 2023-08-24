import { type ValueOf } from '~/libs/types/types.js';
import { type UserGroupKey } from '~/packages/users/libs/enums/enums.js';

type UserMocked = {
  id: number;
  group: {
    key: ValueOf<typeof UserGroupKey>;
  };
};

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

export { type ApiHandlerOptions, type UserMocked };
