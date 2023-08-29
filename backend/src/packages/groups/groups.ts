import { database, schema } from '~/libs/packages/database/database.js';

import { GroupRepository } from './group.repository.js';
import { GroupService } from './group.service.js';

const groupRepository = new GroupRepository(database, schema.groups);
const groupService = new GroupService(groupRepository);

export { UserGroupKey } from '../users/libs/enums/enums.js';
export { GroupEntity } from './group.entity.js';
export {
  type GroupDatabaseModel,
  type GroupDatabaseModelCreateUpdate,
  type GroupEntityObjectT,
  type GroupEntityT,
} from './libs/types/types.js';
export { groupService };
