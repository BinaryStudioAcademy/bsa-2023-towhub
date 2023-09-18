import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyAuth from '@fastify/auth';
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import swagger, { type StaticDocumentSpec } from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify, {
  type FastifyError,
  type preHandlerHookHandler,
} from 'fastify';

import { ServerErrorType } from '~/libs/enums/enums.js';
import { type ValidationError } from '~/libs/exceptions/exceptions.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';
import {
  type ServerCommonErrorResponse,
  type ServerValidationErrorResponse,
  type ValidationSchema,
} from '~/libs/types/types.js';
import { authPlugin } from '~/packages/auth/auth.js';
import { filesValidationPlugin } from '~/packages/files/files.js';
import { userService } from '~/packages/users/users.js';

import { type AuthStrategyHandler } from '../controller/controller.js';
import { jwtService } from '../jwt/jwt.js';
import {
  type IServerApp,
  type IServerAppApi,
} from './libs/interfaces/interfaces.js';
import {
  type ServerAppRouteParameters,
  type ValidateFilesStrategyOptions,
} from './libs/types/types.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
  database: IDatabase;
  apis: IServerAppApi[];
};

class ServerApp implements IServerApp {
  private config: IConfig;

  private logger: ILogger;

  private database: IDatabase;

  private apis: IServerAppApi[];

  private app: ReturnType<typeof Fastify>;

  public constructor({ config, logger, database, apis }: Constructor) {
    this.config = config;
    this.logger = logger;
    this.database = database;
    this.apis = apis;

    this.app = Fastify();
  }

  public addRoute(parameters: ServerAppRouteParameters): void {
    const {
      path,
      method,
      handler,
      validation,
      authStrategy,
      validateFilesStrategy,
    } = parameters;

    const preHandler: preHandlerHookHandler[] = [];

    if (authStrategy) {
      const authStrategyHandler = this.resolveAuthStrategy(authStrategy);

      if (authStrategyHandler) {
        preHandler.push(authStrategyHandler);
      }
    }

    if (validateFilesStrategy) {
      preHandler.push(
        this.resolveFileValidationStrategy(validateFilesStrategy),
      );
    }

    this.app.route({
      url: path,
      method,
      handler,
      preHandler,
      schema: {
        body: validation?.body,
        params: validation?.params,
        querystring: validation?.query,
      },
    });

    this.logger.info(`Route: ${method as string} ${path} is registered`);
  }

  private resolveFileValidationStrategy(
    validateFilesStrategy: ValidateFilesStrategyOptions,
  ): preHandlerHookHandler {
    const { strategy, filesInputConfig } = validateFilesStrategy;

    return this.app[strategy](filesInputConfig);
  }

  private resolveAuthStrategy(
    strategy?: AuthStrategyHandler,
  ): undefined | preHandlerHookHandler {
    if (Array.isArray(strategy)) {
      const strategies = [];

      for (const it of strategy) {
        if (typeof it === 'string' && it in this.app) {
          strategies.push(this.app[it]);
        }
      }

      return this.app.auth(strategies, { relation: 'and' });
    }

    if (typeof strategy === 'string' && strategy in this.app) {
      return this.app.auth([this.app[strategy]]);
    }

    return undefined;
  }

  public addRoutes(parameters: ServerAppRouteParameters[]): void {
    for (const it of parameters) {
      this.addRoute(it);
    }
  }

  public initRoutes(): void {
    const routers = this.apis.flatMap((it) => it.routes);

    this.addRoutes(routers);
  }

  public async initMiddlewares(): Promise<void> {
    await Promise.all(
      this.apis.map(async (it) => {
        this.logger.info(
          `Generate swagger documentation for API ${it.version}`,
        );

        await this.app.register(swagger, {
          mode: 'static',
          specification: {
            document: it.generateDoc() as StaticDocumentSpec['document'],
          },
        });

        await this.app.register(swaggerUi, {
          routePrefix: `${it.version}/documentation`,
        });

        await this.app.register(cors, {
          origin: '*',
          methods: 'GET,PUT,POST,DELETE',
          allowedHeaders: 'Content-Type',
        });
      }),
    );
  }

  private initValidationCompiler(): void {
    this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
      return <T, R = ReturnType<ValidationSchema['validate']>>(data: T): R => {
        return schema.validate(data, {
          abortEarly: false,
        }) as R;
      };
    });
  }

  private async initServe(): Promise<void> {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../public',
    );

    await this.app.register(fastifyStatic, {
      root: staticPath,
      prefix: '/',
    });

    this.app.setNotFoundHandler(async (_request, response) => {
      await response.sendFile('index.html', staticPath);
    });
  }

  private initErrorHandler(): void {
    this.app.setErrorHandler(
      (error: FastifyError | ValidationError, _request, replay) => {
        if ('isJoi' in error) {
          this.logger.error(`[Validation Error]: ${error.message}`);

          for (const it of error.details) {
            this.logger.error(`[${it.path.toString()}] — ${it.message}`);
          }

          const response: ServerValidationErrorResponse = {
            errorType: ServerErrorType.VALIDATION,
            message: error.message,
            details: error.details.map((it) => ({
              path: it.path,
              message: it.message,
            })),
          };

          return replay.status(HttpCode.UNPROCESSED_ENTITY).send(response);
        }

        if (error instanceof HttpError) {
          this.logger.error(
            `[Http Error]: ${error.status.toString()} – ${error.message}`,
          );

          const response: ServerCommonErrorResponse = {
            errorType: ServerErrorType.COMMON,
            message: error.message,
          };

          return replay.status(error.status).send(response);
        }

        this.logger.error(error.message);

        const response: ServerCommonErrorResponse = {
          errorType: ServerErrorType.COMMON,
          message: error.message,
        };

        return replay.status(HttpCode.INTERNAL_SERVER_ERROR).send(response);
      },
    );
  }

  private async initPlugins(): Promise<void> {
    await this.app.register(fastifyAuth);
    await this.app.register(authPlugin, {
      config: this.config,
      userService,
      jwtService,
    });
    await this.app.register(fastifyMultipart);
    await this.app.register(filesValidationPlugin);
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization…');

    await this.initServe();

    socketService.initializeIo({
      app: this.app,
      geolocationCacheService: GeolocationCacheService.getInstance(),
    });

    await this.initMiddlewares();

    await this.initPlugins();

    this.initValidationCompiler();

    this.initErrorHandler();

    this.initRoutes();

    this.database.connect();

    await this.app
      .listen({
        port: this.config.ENV.APP.PORT,
      })
      .catch((error: Error) => {
        this.logger.error(error.message, {
          cause: error.cause,
          stack: error.stack,
        });
      });

    this.logger.info(
      `Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
        this.config.ENV.APP.ENVIRONMENT as string
      }.`,
    );
  }
}

export { ServerApp };
