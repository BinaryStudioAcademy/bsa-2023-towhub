import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(database, schema.users);
const userService = new UserService(userRepository);
const userController = new UserController(logger, userService);

export {
  type BusinessSignUpRequestDto,
  type BusinessSignUpResponseDto,
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserEntityObjectT,
  type UserEntityObjectWithGroupAndBusinessT,
  type UserEntityObjectWithGroupT,
  type UserEntityT,
} from './libs/types/types.js';
export {
  businessSignUpValidationSchema,
  customerSignUpValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { userController, userService };
