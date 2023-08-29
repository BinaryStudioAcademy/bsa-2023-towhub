import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type GroupDatabaseModel, type GroupEntityObjectT } from '~/packages/groups/groups.js';

import { type UserEntity } from '../../user.entity.js';
import { type UserEntityT } from './types.js';

type UserDatabaseModel = InferModel<DatabaseSchema['users']>;

type UserDatabaseModelWithGroup = UserDatabaseModel & { groups: GroupDatabaseModel };

type UserDatabaseModelCreateUpdate = InferModel<DatabaseSchema['users'], 'insert'>;

type UserEntityCreateUpdate = Omit<UserEntityT, 'id' | 'passwordHash' | 'passwordSalt' | 'accessToken'> & {
  password: string;
};

type UserEntityObjectT = ReturnType<UserEntity['toObject']>;

type UserEntityObjectWithGroupT = UserEntityObjectT & { groups: GroupEntityObjectT };

export {
  type UserDatabaseModel,
  type UserDatabaseModelCreateUpdate,
  type UserDatabaseModelWithGroup,
  type UserEntityCreateUpdate,
  type UserEntityObjectT,
  type UserEntityObjectWithGroupT
};
