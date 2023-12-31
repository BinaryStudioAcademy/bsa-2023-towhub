import { type BusinessEntityT } from '~/packages/business/business.js';
import { type DriverWithAvatarUrl } from '~/packages/drivers/drivers.js';

import { type UserGroupEntityT } from './types.js';

type UserEntity = {
  id: number;
  phone: string;
  passwordHash: string;
  passwordSalt: string;
  email: string;
  firstName: string;
  lastName: string;
  groupId: number;
  accessToken: string | null;
};

type UserEntityObjectWithGroupT = Omit<
  UserEntity,
  'groupId' | 'passwordHash' | 'passwordSalt'
> & {
  group: UserGroupEntityT;
};

type UserEntityObjectWithGroupAndBusinessT = UserEntityObjectWithGroupT & {
  business: BusinessEntityT;
};

type UserEntityObjectWithGroupAndDriverT = UserEntityObjectWithGroupT & {
  driver: DriverWithAvatarUrl;
};

type AuthUser =
  | UserEntityObjectWithGroupT
  | UserEntityObjectWithGroupAndBusinessT
  | UserEntityObjectWithGroupAndDriverT;

export {
  type AuthUser,
  type UserEntityObjectWithGroupAndBusinessT,
  type UserEntityObjectWithGroupAndDriverT,
  type UserEntityObjectWithGroupT,
  type UserEntity as UserEntityT,
};
