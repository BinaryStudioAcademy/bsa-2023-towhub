import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { truckService } from '~/packages/trucks/trucks.js';

import { businessService } from '../business/business.js';
import { driverService } from '../drivers/drivers.js';
import { ShiftController } from './shift.controller.js';
import { ShiftRepository } from './shift.repository.js';
import { ShiftService } from './shift.service.js';
import { ShiftSocketService } from './shift.socket-service.js';

const shiftRepository = new ShiftRepository(database, schema.shifts);

const shiftService = new ShiftService(
  shiftRepository,
  businessService,
  driverService,
);

const shiftController = new ShiftController(logger, shiftService);

const shiftSocketService = new ShiftSocketService({
  shiftService,
  truckService,
});

export { ShiftsApiPath, ShiftValidationMessage } from './libs/enums/enums.js';
export {
  type ShiftCloseRequestDto,
  type ShiftCreateRequestDto,
  type ShiftEntityT,
  type ShiftResponseDto,
} from './libs/types/types.js';
export {
  shiftCloseValidationSchema,
  shiftCreateValidationSchema,
} from './libs/validation-schemas/validaion-schemas.js';
export { shiftController, shiftService, shiftSocketService };
export { ShiftService } from './shift.service.js';
export { ShiftSocketService } from './shift.socket-service.js';
