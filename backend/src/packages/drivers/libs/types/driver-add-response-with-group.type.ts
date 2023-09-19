import { type DriverCreateUpdateResponseDto } from 'shared/build/index.js';

import { type GroupEntityT } from '~/packages/groups/groups.js';

type DriverAddResponseWithGroup = DriverCreateUpdateResponseDto & {
  group: GroupEntityT;
  trucksId: number[];
};

export { type DriverAddResponseWithGroup };
