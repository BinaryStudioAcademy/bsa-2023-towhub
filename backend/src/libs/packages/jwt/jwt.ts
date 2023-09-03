import { config } from '~/libs/packages/config/config.js';

import { JwtService } from './jwt.package.js';

const jwtService = new JwtService(config.ENV.JWT.SECRET, config.ENV.JWT.ISSUER);

export { type JwtPayload } from './libs/types/types.js';
export { jwtService };
