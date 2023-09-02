import { type UserEntityT, type UserGroupEntityT } from '~/libs/types/types.js';

type AuthUserT = Pick<
  UserEntityT,
  'firstName' | 'lastName' | 'email' | 'phone' | 'accessToken'
> & {
  group: UserGroupEntityT['key'];
};

export { type AuthUserT };
