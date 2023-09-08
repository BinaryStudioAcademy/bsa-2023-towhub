import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Mailer } from './mailer.package.js';

const mailer = new Mailer({ config, logger });

try {
  await mailer.connect();
  logger.info('Mailer service started');
} catch (error) {
  logger.error('Mailer service: error during the startup!');
  logger.error(JSON.stringify(error));
}

export { mailer };
export { Mailer } from './mailer.package.js';
