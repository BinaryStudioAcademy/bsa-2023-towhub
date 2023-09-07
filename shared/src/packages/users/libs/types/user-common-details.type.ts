import { type UserEntityT } from './types.js';

type UserCommonDetails = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
>;

export { type UserCommonDetails };
