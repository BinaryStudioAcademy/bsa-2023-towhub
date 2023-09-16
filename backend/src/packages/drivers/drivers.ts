import { database, schema } from '~/libs/packages/database/database.js';
import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';

import { groupService } from '../groups/groups.js';
import { userService } from '../users/users.js';
import { DriverService } from './driver.service.js';

const driverRepository = new DriverRepository(database, schema.drivers);
const driverService = new DriverService({
  driverRepository,
  userService,
  groupService,
  geolocationCacheService: GeolocationCacheService.getInstance(),
});

export { driverRepository, driverService };
export {
  type BusinessGetAllDriversRequestParameters,
  type DriverAddPayload,
  type DriverAddResponseWithGroup,
  type DriverCreateUpdateResponseDto,
  type DriverEntity,
  type DriverGetAllResponseDto,
  type DriverGetRequestParameters,
  type DriverUpdateDeleteRequestParameters,
  type DriverUpdatePayload,
  type DriverUpdateRequestDto,
} from './libs/types/types.js';
