import { type FastifyReply, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { HttpHeader, HttpMessage } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

import { AuthStrategy } from './auth.js';
import { UserGroupKey } from './libs/enums/enums.js';
import { createUnauthorizedError } from './libs/helpers/create-unauthorized-error.helper.js';
import { type AuthPluginOptions } from './libs/types/auth-plugin-options.type.js';
import { jwtPayloadSchema } from './libs/validation-schemas/validation-schemas.js';

const authPlugin = fp<AuthPluginOptions>((fastify, options, done) => {
  const { userService, jwtService } = options;

  fastify.decorateRequest('user', null);

  const verifyJwtStrategy =
    (isJwtRequired: boolean) =>
    async (
      request: FastifyRequest,
      _: FastifyReply,
      done: (error?: Error) => void,
    ): Promise<void> => {
      try {
        const token = request.headers[HttpHeader.AUTHORIZATION]?.replace(
          'Bearer ',
          '',
        );

        if (!token && isJwtRequired) {
          return done(createUnauthorizedError(HttpMessage.UNAUTHORIZED));
        } else if (!token) {
          return;
        }

        const rawPayload = await jwtService.verifyToken(token);

        const { error, value: payload } = jwtPayloadSchema.validate(rawPayload);

        if (!payload) {
          return done(createUnauthorizedError(HttpMessage.INVALID_JWT, error));
        }

        const user = await userService.findById(payload.id);

        if (!user || user.accessToken !== token) {
          return done(createUnauthorizedError(HttpMessage.INVALID_JWT));
        }

        request.user = user;

        // Async should not call done() unless error
        // return done()
      } catch (error) {
        return done(createUnauthorizedError(HttpMessage.UNAUTHORIZED, error));
      }
    };

  const verifyGroup =
    (group: ValueOf<typeof UserGroupKey>) =>
    async (
      request: FastifyRequest,
      _: FastifyReply,
      done: (error?: Error) => void,
    ): Promise<void> => {
      if (request.user.group.key !== group) {
        return done(createUnauthorizedError(HttpMessage.UNAUTHORIZED));
      }
    };

  fastify.decorate(AuthStrategy.INJECT_USER, verifyJwtStrategy(false));

  fastify.decorate(AuthStrategy.VERIFY_JWT, verifyJwtStrategy(true));

  fastify.decorate(
    AuthStrategy.VERIFY_BUSINESS_GROUP,
    verifyGroup(UserGroupKey.BUSINESS),
  );

  fastify.decorate(
    AuthStrategy.VERIFY_DRIVER_GROUP,
    verifyGroup(UserGroupKey.DRIVER),
  );

  done();
});

export { authPlugin };
