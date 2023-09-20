import { type UserGroupEntityT } from '~/packages/users/users.js';

import { type DriverCreateUpdateResponseDto } from './driver-create-update-response-dto.type.js';

type DriverAddResponseWithGroup = DriverCreateUpdateResponseDto & {
  group: UserGroupEntityT;
  possibleTruckIds: number[];
};

export { type DriverAddResponseWithGroup };
