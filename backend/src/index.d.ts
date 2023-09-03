import { type AuthStrategy } from './packages/auth/auth.js';
import { type UserEntityObjectWithGroupT } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyInstance {
    [AuthStrategy.VERIFY_JWT]: FastifyAuthFunction;
    [AuthStrategy.VERIFY_BUSINESS_GROUP]: FastifyAuthFunction;
    [AuthStrategy.VERIFY_DRIVER_GROUP]: FastifyAuthFunction;
  }

  interface FastifyRequest {
    user: UserEntityObjectWithGroupT;
  }
}
