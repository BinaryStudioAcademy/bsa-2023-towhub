import { config } from '../config/config.js';
import { logger } from '../logger/logger.js';
import { RekognitionService } from './rekognition.package.js';

const rekognitionService = new RekognitionService({ logger, config });

export { rekognitionService };
export { RekognitionService } from './rekognition.package.js';
