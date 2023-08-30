import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { type GroupEntity } from '../../group.entity.js';

type GroupDatabaseModel = InferModel<DatabaseSchema['groups']>;

type GroupDatabaseModelCreateUpdate = InferModel<
  DatabaseSchema['groups'],
  'insert'
>;

type GroupEntityT = Omit<GroupDatabaseModel, 'createdAt' | 'updatedAt'>;

type GroupEntityObjectT = ReturnType<GroupEntity['toObject']>;

export {
  type GroupDatabaseModel,
  type GroupDatabaseModelCreateUpdate,
  type GroupEntityObjectT,
  type GroupEntityT,
};
