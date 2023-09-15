import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema } from '~/libs/types/types.js';

import { type ApiHandler } from './api-handler.type.js';
import { type AuthStrategyHandler } from './auth-strategy-handler.type.js';
import { type ValidateFilesStrategyOptions } from './validate-files-strategy-options.js';

type ControllerRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: ApiHandler;
  authStrategy?: AuthStrategyHandler;
  validateFilesStrategy?: ValidateFilesStrategyOptions;
  validation?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };
