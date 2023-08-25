import { type UserGroupKeyT } from './user-group-key.type.js';
import { type UserGroupNameT } from './user-group-name.type.js';

type UserGroupEntity = {
  id: number;
  name: UserGroupNameT;
  key: UserGroupKeyT;
};

export { type UserGroupEntity as UserGroupEntityT };
