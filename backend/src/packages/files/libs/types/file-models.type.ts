import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type FileEntity } from '~/packages/files/files.entity.js';

import { type FileEntityT } from './types.js';

type FileDatabaseModel = InferModel<DatabaseSchema['files']>;

type FileDatabaseModelCreateUpdate = InferModel<
  DatabaseSchema['files'],
  'insert'
>;

type FileEntityObjectT = ReturnType<FileEntity['toObject']>;

type FileEntityCreateUpdate = Omit<FileEntityT, 'id'>;

export {
  type FileDatabaseModel,
  type FileDatabaseModelCreateUpdate,
  type FileEntityCreateUpdate,
  type FileEntityObjectT,
};
