import { type FastifyAuthFunction } from '@fastify/auth';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { HttpMessage } from '~/libs/packages/http/http.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

import { AuthStrategy } from './auth.js';
import { assertJwtPayload } from './libs/helpers/assert-jwt-payload.helper.js';
import { createUnauthorizedError } from './libs/helpers/create-unauthorized-error.helper.js';
import { type AuthPluginOptions } from './libs/types/auth-plugin-options.type.js';

declare module 'fastify' {
  interface FastifyInstance {
    [AuthStrategy.VERIFY_JWT]: FastifyAuthFunction;
  }

  interface FastifyRequest {
    user: UserEntityObjectWithGroupT;
  }
}

const authPlugin = fp<AuthPluginOptions>((fastify, options) => {
  const { userService, jwtService } = options;

  fastify.decorate(
    AuthStrategy.VERIFY_JWT,
    async (
      request: FastifyRequest,
      _: FastifyReply,
      done: (error?: Error) => void,
    ): Promise<void> => {
      try {
        const token = request.headers.authorization?.replace('Bearer ', '');

        if (!token) {
          return done(createUnauthorizedError(HttpMessage.UNAUTHORIZED));
        }

        const payload = await jwtService.verifyToken(token);

        const decoded = assertJwtPayload(payload);

        if (!decoded) {
          return done(createUnauthorizedError(HttpMessage.INVALID_JWT));
        }

        const user = await userService.findById(payload.id);

        if (!user) {
          return done(createUnauthorizedError(HttpMessage.INVALID_JWT));
        }

        fastify.decorateRequest('user', user);

        // Async should not call done() unless error
        // return done()
      } catch (error) {
        return done(createUnauthorizedError(HttpMessage.UNAUTHORIZED, error));
      }
    },
  );
});

export { authPlugin };
