import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';

import { DriverController } from './driver.controller.js';
import { DriverService } from './driver.service.js';

const driverRepository = new DriverRepository(database, schema.drivers);
const driverService = new DriverService(driverRepository);
const driverController = new DriverController(logger, driverService);

export { driverController, driverRepository, driverService };
export {
  type DriverAddRequestDto,
  type DriverAddResponseDto,
  type DriverCreatePayload,
  type DriverDeleteRequestParameters,
  type DriverEntityT,
  type DriverGetAllResponseDto,
  type DriverGetRequestParameters,
  type DriverUpdatePayload,
  type DriverUpdateRequestDto,
  type DriverUpdateRequestParameters,
  type DriverUpdateResponseDto,
} from './libs/types/types.js';
