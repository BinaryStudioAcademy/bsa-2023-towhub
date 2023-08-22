import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema, type ValueOf  } from '~/libs/types/types.js';

import { type ApiHandler } from './api-handler.type.js';

type ControllerRouteParameters = {
  path: string;
  method: ValueOf<typeof HttpMethod>;
  handler: ApiHandler;
  validation?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };
