import { type DriverCreateUpdateResponseDto } from 'shared/build/index.js';

import { type GroupEntityT } from '~/packages/groups/groups.js';

type DriverAddResponseWithGroup = DriverCreateUpdateResponseDto & {
  group: GroupEntityT;
  possibleTruckIds: number[];
};

export { type DriverAddResponseWithGroup };
