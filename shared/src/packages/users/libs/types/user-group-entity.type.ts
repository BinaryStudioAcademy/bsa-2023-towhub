import { type UserGroupKeyT } from './user-group-key.type.js';
import { type UserGroupNameT } from './user-group-name.type.js';

type UserGroupEntity = {
  id: number;
  name: UserGroupNameT;
  key: UserGroupKeyT;
};

type UserGroupEntityObject = {
  id: number;
  name: string;
  key: string;
};

export {
  type UserGroupEntityObject as UserGroupEntityObjectT,
  type UserGroupEntity as UserGroupEntityT,
};
