import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type ServerAppRouteParameters } from '~/libs/packages/server-application/server-application.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type AuthStrategy } from '~/packages/auth/auth.js';

import { type IController } from './libs/interfaces/interface.js';
import {
  type ApiHandler,
  type ApiHandlerOptions,
  type ControllerRouteParameters,
} from './libs/types/types.js';

type DefaultStrategies =
  | ValueOf<typeof AuthStrategy>
  | ValueOf<typeof AuthStrategy>[]
  | undefined;

class Controller implements IController {
  private logger: ILogger;

  private apiUrl: string;

  public routes: ServerAppRouteParameters[];

  public defaultStrategies: DefaultStrategies;

  public constructor(
    logger: ILogger,
    apiPath: string,
    strategies?: DefaultStrategies,
  ) {
    this.logger = logger;
    this.apiUrl = apiPath;
    this.routes = [];
    this.defaultStrategies = strategies;
  }

  public addRoute(options: ControllerRouteParameters): void {
    const { handler, path } = options;
    const fullPath = this.apiUrl + path;

    this.routes.push({
      authStrategy: this.defaultStrategies,
      ...options,
      path: fullPath,
      handler: (request, reply) => this.mapHandler(handler, request, reply),
    });
  }

  private async mapHandler(
    handler: ApiHandler,
    request: Parameters<ServerAppRouteParameters['handler']>[0],
    reply: Parameters<ServerAppRouteParameters['handler']>[1],
  ): Promise<void> {
    this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

    const handlerOptions = this.mapRequest(request);
    const { status, payload } = await handler(handlerOptions);

    return await reply.status(status).send(payload);
  }

  private mapRequest(
    request: Parameters<ServerAppRouteParameters['handler']>[0],
  ): ApiHandlerOptions {
    const { body, query, params, user, parsedFiles } = request;

    return {
      body,
      query,
      params,
      user,
      parsedFiles,
    };
  }
}

export { Controller };
