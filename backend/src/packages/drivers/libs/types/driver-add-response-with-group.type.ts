import { type DriverResponseDto } from 'shared/build/index.js';

import { type GroupEntityT } from '~/packages/groups/groups.js';

type DriverAddResponseWithGroup = DriverResponseDto & {
  group: GroupEntityT;
};

export { type DriverAddResponseWithGroup };
