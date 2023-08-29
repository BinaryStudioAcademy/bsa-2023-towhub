import { logger } from '~/libs/packages/logger/logger.js';
import { userService } from '~/packages/users/users.js';

import { groupService } from '../groups/groups.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(userService, groupService);
const authController = new AuthController(logger, authService);

export { authPlugin } from './auth.app-plugin.js';
export { authController, authService };
export { AuthStrategy } from './libs/enums/auth-strategy.enum.js';
