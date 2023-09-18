import { type UserGroupKeyT } from './user-group-key.type.js';

type UserGroupEntity = {
  id: number;
  name: string;
  key: UserGroupKeyT;
};

export { type UserGroupEntity as UserGroupEntityT };
