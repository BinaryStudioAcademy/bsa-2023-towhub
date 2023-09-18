import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { S3ClientService } from './s3-client-service.package.js';

const s3ClientService = new S3ClientService({ config, logger });

export { s3ClientService };
export { S3ClientService } from './s3-client-service.package.js';
