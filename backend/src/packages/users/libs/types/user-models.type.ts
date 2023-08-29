import { type InferModel } from 'drizzle-orm';
import { type UserEntityT } from 'shared/build/index.js';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type GroupDatabaseModel, type GroupEntityObjectT } from '~/packages/groups/groups.js';

import { type UserEntity } from '../../user.entity.js';

type UserDatabaseModel = InferModel<DatabaseSchema['users']>;

type UserDatabaseModelWithGroup = UserDatabaseModel & { group: GroupDatabaseModel };

type UserDatabaseModelCreateUpdate = InferModel<DatabaseSchema['users'], 'insert'>;

type UserEntityCreateUpdate = Omit<UserEntityT, 'id' | 'passwordHash' | 'passwordSalt' | 'accessToken'> & {
  password: string;
};

type UserEntityObjectT = ReturnType<UserEntity['toObject']>;

type UserEntityObjectWithGroupT = (UserEntityObjectT & { group: GroupEntityObjectT }) | null;

export {
  type UserDatabaseModel,
  type UserDatabaseModelCreateUpdate,
  type UserDatabaseModelWithGroup,
  type UserEntityObjectT,
  type UserEntityObjectWithGroupT
};
export { type UserEntityCreateUpdate };
