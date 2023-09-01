import { type DriverAddResponseDto } from 'shared/build/index.js';

import { type GroupEntityT } from '~/packages/groups/groups.js';

type DriverAddResponseWithGroup = DriverAddResponseDto & {
  group: GroupEntityT;
};

export { type DriverAddResponseWithGroup };
