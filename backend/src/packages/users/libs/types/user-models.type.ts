import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type GroupDatabaseModel } from '~/packages/groups/groups.js';
import { type UserEntity } from '~/packages/users/user.entity.js';

import { type UserEntityT } from './types.js';

type UserDatabaseModel = InferModel<DatabaseSchema['users']>;

type UserDatabaseModelWithGroup = UserDatabaseModel & {
  group: GroupDatabaseModel;
};

type UserDatabaseModelCreateUpdate = InferModel<
  DatabaseSchema['users'],
  'insert'
>;

type UserEntityCreateUpdate = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'accessToken'
> & {
  password: string;
};

type UserEntityObjectT = ReturnType<UserEntity['toObject']>;

export {
  type UserDatabaseModel,
  type UserDatabaseModelCreateUpdate,
  type UserDatabaseModelWithGroup,
  type UserEntityCreateUpdate,
  type UserEntityObjectT,
};
