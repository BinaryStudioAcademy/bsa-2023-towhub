import { type UserEntityObjectWithGroupT } from 'shared/build';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserEntityObjectWithGroupT | null;
};

export { type DefaultApiHandlerOptions };
