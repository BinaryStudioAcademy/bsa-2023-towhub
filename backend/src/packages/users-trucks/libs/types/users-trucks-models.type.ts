import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { type UsersTrucksEntity } from '../../users-trucks.entity.js';
import { type UsersTrucksEntityT } from './types.js';

type UsersTrucksModel = InferModel<DatabaseSchema['usersTrucks']>;

type UsersTrucksEntityObjectT = ReturnType<UsersTrucksEntity['toObject']>;

type UsersTrucksCreateUpdate = Omit<UsersTrucksEntityT, 'id'>;

export {
  type UsersTrucksCreateUpdate,
  type UsersTrucksEntityObjectT,
  type UsersTrucksModel,
};
