import { type HttpCode } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type ApiHandlerResponse<T = unknown> = {
  status: ValueOf<typeof HttpCode>;
  payload: T;
};

export { type ApiHandlerResponse };
