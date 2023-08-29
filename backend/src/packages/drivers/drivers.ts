import { database, schema } from '~/libs/packages/database/database.js';
import { DriverRepository } from '~/packages/drivers/driver.repository.js';

const driverRepository = new DriverRepository(database, schema.drivers);

export { driverRepository };
export {
  type DriverAddRequestDto,
  type DriverAddResponseDto,
  type DriverDeleteRequestParameters,
  type DriverEntityT,
  type DriverGetRequestParameters,
} from './libs/types/types.js';
