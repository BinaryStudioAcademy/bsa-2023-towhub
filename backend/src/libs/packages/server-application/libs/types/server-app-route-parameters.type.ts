import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type AuthStrategyHandler } from '~/libs/packages/controller/controller.js';
import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema } from '~/libs/types/types.js';

import { type ValidateFilesStrategyOptions } from './types.js';

type ServerAppRouteParameters = {
  path: string;
  method: HttpMethod;
  authStrategy?: AuthStrategyHandler;
  validateFilesStrategy?: ValidateFilesStrategyOptions;
  handler: (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => Promise<void> | void;
  validation?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ServerAppRouteParameters };
