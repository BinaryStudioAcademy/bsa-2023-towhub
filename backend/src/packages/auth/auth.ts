import { config } from '~/libs/packages/config/config.js';
import { jwtService } from '~/libs/packages/jwt/jwt.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { encryptService } from '~/libs/packages/packages.js';
import { userService } from '~/packages/users/users.js';

import { businessService } from '../business/business.js';
import { groupService } from '../groups/groups.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService({
  userService,
  groupService,
  jwtService,
  encryptService,
  businessService,
  config: config.ENV.JWT,
});

const authController = new AuthController(logger, authService);

export { authPlugin } from './auth.app-plugin.js';
export { authController, authService };
export { AuthStrategy } from './libs/enums/auth-strategy.enum.js';
