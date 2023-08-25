import { type ValueOf } from '~/libs/types/types.js';

import { type UserGroupKey } from '../enums/enums.js';

type UserGroupKey = ValueOf<typeof UserGroupKey>;

export { type UserGroupKey as UserGroupKeyT };
