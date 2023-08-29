import { database, schema } from '~/libs/packages/database/database.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';

import { DriverService } from './driver.service.js';

const driverRepository = new DriverRepository(database, schema.drivers);
const driverService = new DriverService(driverRepository);

export { driverRepository, driverService };
export {
  type DriverAddRequestDto,
  type DriverAddResponseDto,
  type DriverCreatePayload,
  type DriverDeleteRequestParameters,
  type DriverEntityT,
  type DriverGetRequestParameters,
  type DriverUpdatePayload,
  type DriverUpdateRequestDto,
  type DriverUpdateRequestParameters,
  type DriverUpdateResponseDto,
} from './libs/types/types.js';
