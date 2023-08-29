import { type FastifyAuthFunction } from '@fastify/auth';
import { type FastifyInstance } from 'fastify';
import { type ValueOf } from 'shared/build';

import { type AuthStrategy } from '~/packages/auth/auth.js';

type AuthStrategyHandler = ValueOf<typeof AuthStrategy> | ((fastify: FastifyInstance) => FastifyAuthFunction[] | (FastifyAuthFunction | FastifyAuthFunction[])[]);

export { type AuthStrategyHandler };
