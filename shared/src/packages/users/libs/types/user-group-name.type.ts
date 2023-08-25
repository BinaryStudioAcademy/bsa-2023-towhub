import { type CapitalizeEnum, type ValueOf } from '~/libs/types/types.js';

import { type UserGroupKey } from '../enums/enums.js';

type UserGroupName = ValueOf<CapitalizeEnum<typeof UserGroupKey>>;

export { type UserGroupName as UserGroupNameT };
