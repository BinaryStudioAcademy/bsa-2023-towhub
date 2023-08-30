import { type FastifyReply, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { jwtPayloadSchema } from 'shared/build/index.js';

import { HttpMessage } from '~/libs/packages/http/http.js';

import { AuthStrategy } from './auth.js';
import { createUnauthorizedError } from './libs/helpers/create-unauthorized-error.helper.js';
import { type AuthPluginOptions } from './libs/types/auth-plugin-options.type.js';

const authPlugin = fp<AuthPluginOptions>((fastify, options, done) => {
  const { userService, jwtService } = options;

  fastify.decorateRequest('user', null);

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
    },
  );

  done();
});

export { authPlugin };
