import { type FastifyAuthFunction } from '@fastify/auth';
import jwt from '@fastify/jwt';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { HttpMessage } from '~/libs/packages/http/http.js';

// import { type UserSignInRequestDto, HttpMessage } from 'shared/build/index.js';
import { GroupEntity } from '../groups/groups.js';
import { type UserEntityObjectWithGroupT } from '../users/libs/types/user-models.type.js';
import { type UserEntityT } from '../users/users.js';
import { AuthStrategy } from './auth.js';
import { assertJwtPayload } from './libs/helpers/assert-jwt-payload.helper.js';
import { createUnauthorizedError } from './libs/helpers/create-unauthorized-error.helper.js';
import { type AuthPluginOptions } from './libs/types/auth-plugin-options.type.js';
import { type UserSignInRequestDto } from './libs/types/types.js';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: UserEntityT['id'] }
    user: UserEntityObjectWithGroupT;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    [AuthStrategy.VERIFY_JWT]: FastifyAuthFunction
    [AuthStrategy.VERIFY_USER_CREDENTIALS]: FastifyAuthFunction
  }
}

const authPlugin = fp<AuthPluginOptions>(async (fastify, options) => {
  const { userService, config, encryptService } = options;

  await fastify.register(jwt, { secret: config.ENV.JWT.SECRET });

  fastify.decorate(AuthStrategy.VERIFY_JWT, async (request: FastifyRequest, _: FastifyReply, done: (error?: Error) => void): Promise<void> => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return done(createUnauthorizedError(HttpMessage.UNAUTHORIZED));
      }

      const payload = await request.jwtDecode();

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
  });

  fastify.decorate(AuthStrategy.VERIFY_USER_CREDENTIALS, async (request: FastifyRequest, reply: FastifyReply, done: (error?: Error) => void): Promise<void> => {
    try {
      const { email, password } = request.body as UserSignInRequestDto;

      const user = await userService.findByEmailRaw(email);

      if (!user) {
        return done(createUnauthorizedError(HttpMessage.WRONG_EMAIL));
      }

      const passwordsAreEqual = await encryptService.compare(password, user.passwordHash);

      if (!passwordsAreEqual) {
        return done(createUnauthorizedError(HttpMessage.WRONG_PASSWORD));
      }

      const userId = user.id;
      const jwtPayload = { id: userId };
      const newToken = await reply.jwtSign(jwtPayload, { expiresIn: config.ENV.JWT.ACCESS_LIFETIME });
      const updatedUser = await userService.setAccessToken(userId, newToken);

      fastify.decorateRequest('user', {
        ...updatedUser,
        groups: GroupEntity.initialize(user.groups).toObject() // Had to take group from raw because setAccessToken does not return this
      });

      // Async should not call done() unless error
      // return done();

    } catch (error) {
      return done(error as Error);
    }
  });

});

export { authPlugin };
