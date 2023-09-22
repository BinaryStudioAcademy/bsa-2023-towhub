import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { TruckController } from './truck.controller.js';
import { TruckRepository } from './truck.repository.js';
import { TruckService } from './truck.service.js';

const truckRepository = new TruckRepository(
  database,
  schema.trucks,
  schema.usersTrucks,
);
const truckService = new TruckService(truckRepository);

const truckController = new TruckController(logger, truckService);

export { truckController, truckService };
export {
  type TruckDatabaseModel,
  type TruckEntityT,
} from './libs/types/types.js';
export {
  truckCreateRequestBody,
  truckGetParameters,
  truckUpdateRequestBody,
} from './libs/validation-schemas/validation-schemas.js';
