import { database, schema } from '~/libs/packages/database/database.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';

import { groupService } from '../groups/groups.js';
import { userService } from '../users/users.js';
import { DriverService } from './driver.service.js';

const driverRepository = new DriverRepository(database, schema.drivers);
const driverService = new DriverService(
  driverRepository,
  userService,
  groupService,
);

export { driverRepository, driverService };
export {
  type DriverAddPayload,
  type DriverAddResponseWithGroup,
  type DriverAllByBusinessRequestParameters,
  type DriverCreateUpdateRequestDto,
  type DriverCreateUpdateResponseDto,
  type DriverEntity,
  type DriverGetAllResponseDto,
  type DriverGetRequestParameters,
  type DriverUpdateDeleteRequestParameters,
  type DriverUpdatePayload,
} from './libs/types/types.js';
