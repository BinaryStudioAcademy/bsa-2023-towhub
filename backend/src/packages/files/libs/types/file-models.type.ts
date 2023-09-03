import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type FilesEntity } from '~/packages/files/files.entity.js';

type FileDatabaseModel = InferModel<DatabaseSchema['files']>;

type FileDatabaseModelCreateUpdate = InferModel<
  DatabaseSchema['files'],
  'insert'
>;

type FileEntityObjectT = ReturnType<FilesEntity['toObject']>;

export {
  type FileDatabaseModel,
  type FileDatabaseModelCreateUpdate,
  type FileEntityObjectT,
};
