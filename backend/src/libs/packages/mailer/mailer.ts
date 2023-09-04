import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Mailer } from './mailer.package.js';

const mailer = new Mailer({ config, logger });

await mailer.connect();

export { mailer };
export { Mailer } from './mailer.package.js';
