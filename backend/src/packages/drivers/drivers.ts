import { database, schema } from '~/libs/packages/database/database.js';
import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';
import { usersTrucksService } from '~/packages/users-trucks/users-trucks.js';

import { fileVerificationStatusService } from '../file-verification-status/file-verification-status.js';
import { groupService } from '../groups/groups.js';
import { userService } from '../users/users.js';
import { DriverService } from './driver.service.js';

const driverRepository = new DriverRepository(database, schema.drivers);
const driverService = new DriverService({
  driverRepository,
  userService,
  groupService,
  usersTrucksService,
  geolocationCacheService: GeolocationCacheService.getInstance(),
  fileVerificationStatusService,
});

export { driverRepository, driverService };
export { DriverService } from './driver.service.js';
export {
  type DriverAddPayload,
  type DriverAddResponseWithGroup,
  type DriverCreateRequestDto,
  type DriverCreateUpdateResponseDto,
  type DriverEntityT,
  type DriverGetAllResponseDto,
  type DriverGetDriversPagePayload,
  type DriverRequestParameters,
  type DriverUpdatePayload,
  type DriverUpdateRequestDto,
} from './libs/types/types.js';
export {
  driverCreateRequestBody,
  driverParameters,
  driverUpdateRequestBody,
} from './libs/validation-schemas/validation-schemas.js';
