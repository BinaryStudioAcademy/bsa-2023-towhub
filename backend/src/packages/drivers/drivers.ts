import { database, schema } from '~/libs/packages/database/database.js';
import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';

import { filesService } from '../files/files.js';
import { groupService } from '../groups/groups.js';
import { truckService } from '../trucks/trucks.js';
import { userService } from '../users/users.js';
import { DriverService } from './driver.service.js';
import { DriversController } from './drivers.controller.js';

const driverRepository = new DriverRepository(database, schema.drivers);
const driverService = new DriverService({
  driverRepository,
  userService,
  groupService,
  truckService,
  filesService,
  geolocationCacheService: GeolocationCacheService.getInstance(),
});
const driverController = new DriversController(logger, driverService);

export { driverController, driverRepository, driverService };
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
