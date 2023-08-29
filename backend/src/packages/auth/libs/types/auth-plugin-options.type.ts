import { type IConfig } from '~/libs/packages/config/config.js';
import { type EncryptService } from '~/libs/packages/encrypt/encrypt.package.js';
import { type UserService } from '~/packages/users/user.service';

type AuthPluginOptions = {
  config: IConfig;
  userService: UserService;
  encryptService: EncryptService;
};

export { type AuthPluginOptions };
