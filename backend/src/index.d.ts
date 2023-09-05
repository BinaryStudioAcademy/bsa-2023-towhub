import { type AuthStrategy } from './packages/auth/auth.js';
import { type FastifyFileValidationFunction } from './packages/files/files.js';
import { type FilesValidationStrategy } from './packages/files/libs/enums/enums.js';
import { type MultipartParsedFile } from './packages/files/libs/types/types.js';
import { type UserEntityObjectWithGroupT } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyInstance {
    [AuthStrategy.INJECT_USER]: FastifyAuthFunction;
    [AuthStrategy.VERIFY_JWT]: FastifyAuthFunction;
    [AuthStrategy.VERIFY_BUSINESS_GROUP]: FastifyAuthFunction;
    [AuthStrategy.VERIFY_DRIVER_GROUP]: FastifyAuthFunction;
    [FilesValidationStrategy.BASIC]: FastifyFileValidationFunction;
  }

  interface FastifyRequest {
    user: UserEntityObjectWithGroupT;
    parsedFiles: MultipartParsedFile[];
  }
}
