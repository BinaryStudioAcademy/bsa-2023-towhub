import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { RekognitionService } from './rekognition.package.js';

const rekognitionService = new RekognitionService({ logger, config });

export { rekognitionService };
