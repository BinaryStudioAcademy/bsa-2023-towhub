import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { BusinessRepository } from '~/packages/business/business.repository.js';
import { BusinessService } from '~/packages/business/business.service.js';

import { driverRepository } from '../drivers/drivers.js';
import { BusinessController } from './business.controller.js';

const businessRepository = new BusinessRepository(database, schema.business);
const businessService = new BusinessService(
  businessRepository,
  driverRepository,
);

const businessController = new BusinessController(logger, businessService);

export { businessController, businessService };
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
