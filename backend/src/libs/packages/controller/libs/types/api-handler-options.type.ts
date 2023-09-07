import { type DefaultApiHandlerOptions } from './default-api-handler-options.type.js';

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
