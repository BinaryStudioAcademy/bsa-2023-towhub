import { type UserEntityT } from '~/packages/users/users.js';

type JwtPayload = Pick<UserEntityT, 'id'>;

export { type JwtPayload };
