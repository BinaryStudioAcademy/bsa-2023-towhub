import { type IJwtService } from '~/libs/interfaces/interfaces.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type UserService } from '~/packages/users/user.service.js';

type AuthPluginOptions = {
  config: IConfig;
  userService: UserService;
  jwtService: IJwtService;
};

export { type AuthPluginOptions };
