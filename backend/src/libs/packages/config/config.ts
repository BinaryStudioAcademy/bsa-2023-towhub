import { logger } from '../logger/logger.js';
import { Config } from './config.package.js';

const config = new Config(logger);

export { type IConfig } from './libs/interfaces/interfaces.js';
export { config };
