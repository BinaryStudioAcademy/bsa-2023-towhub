import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { rekognitionService } from '~/libs/packages/rekognition/rekognition.js';
import { FileVerificationStatusRepository } from '~/packages/file-verification-status/file-verification-status.repository.js';

import { FileVerificationStatusService } from './file-verification-status.service.js';
import { fileVerificationEventNameToHandler } from './libs/maps/maps.js';

const fileVerificationStatusRepository = new FileVerificationStatusRepository(
  database,
  schema.fileVerificationStatus,
);

const fileVerificationStatusService = new FileVerificationStatusService({
  fileVerificationStatusRepository,
  rekognitionService,
  logger,
  fileVerificationEventNameToHandler,
});

export { fileVerificationStatusRepository, fileVerificationStatusService };
export { FileVerificationStatusRepository } from './file-verification-status.repository.js';
export { FileVerificationStatusService } from './file-verification-status.service.js';
