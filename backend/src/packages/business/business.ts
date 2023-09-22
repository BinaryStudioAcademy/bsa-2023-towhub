import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { BusinessRepository } from '~/packages/business/business.repository.js';
import { BusinessService } from '~/packages/business/business.service.js';

import { driverService } from '../drivers/drivers.js';
import { truckService } from '../trucks/trucks.js';
import { BusinessController } from './business.controller.js';

const businessRepository = new BusinessRepository(database, schema.business);
const businessService = new BusinessService(
  businessRepository,
  driverService,
  truckService,
);

const businessController = new BusinessController(logger, businessService);

export { businessController, businessRepository, businessService };
export {
  type BusinessAddRequestDto,
  type BusinessAddResponseDto,
  type BusinessDeleteRequestParameters,
  type BusinessEntityT,
  type BusinessGetRequestParameters,
  type BusinessUpdateRequestDto,
  type BusinessUpdateRequestParameters,
  type BusinessUpdateResponseDto,
} from './libs/types/types.js';
export {
  businessAddRequestBody,
  businessDeleteParameters,
  businessGetParameters,
  businessUpdateParameters,
  businessUpdateRequestBody,
} from './libs/validation-schemas/validation-schemas.js';
