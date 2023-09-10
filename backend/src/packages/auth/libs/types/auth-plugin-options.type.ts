import { type IJwtService } from '~/libs/interfaces/interfaces.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type StripeRepository } from '~/packages/stripe/stripe.repository.js';
import { type UserService } from '~/packages/users/user.service.js';

type AuthPluginOptions = {
  config: IConfig;
  userService: UserService;
  jwtService: IJwtService;
  stripeRepository: StripeRepository;
};

export { type AuthPluginOptions };
