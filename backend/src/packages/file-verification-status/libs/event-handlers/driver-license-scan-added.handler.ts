import { type FileVerificationStatusEntityT } from 'shared/build/index.js';

import { rekognitionService } from '~/libs/packages/rekognition/rekognition.js';
import { driverService } from '~/packages/drivers/drivers.js';
import { type FileVerificationStatusService } from '~/packages/file-verification-status/file-verification-status.service.js';
import { filesService } from '~/packages/files/files.js';

import {
  FileVerificationMessage,
  FileVerificationStatus,
} from '../enums/enums.js';
import { type FileVerificationEventName } from '../enums/enums.js';
import { type FileVerificationEventHandler } from '../types/types.js';

const driverLicenseScanHandler: FileVerificationEventHandler[typeof FileVerificationEventName.ADDED] =
  async function (
    this: FileVerificationStatusService,
    payload: FileVerificationStatusEntityT,
  ): Promise<void> {
    // if (payload.name !== FileVerificationName.DRIVER_LICENSE_SCAN) {
    //   return;
    // }
    const fileToVerificate = await filesService.findById(payload.fileId);

    if (!fileToVerificate) {
      return;
    }

    const licenseOwner = await driverService.findByLicenseFileId(
      fileToVerificate.id,
    );

    if (!licenseOwner) {
      return;
    }

    const rekognitionResult = await rekognitionService.detectText({
      fileKey: fileToVerificate.key,
      pattern: licenseOwner.driverLicenseNumber,
    });

    await this.update(payload.id, {
      status: rekognitionResult
        ? FileVerificationStatus.VERIFIED
        : FileVerificationStatus.FAILED,
      message: rekognitionResult
        ? FileVerificationMessage.DRIVER_LICENSE_NUMBER_FOUND
        : FileVerificationMessage.DRIVER_LICENSE_NUMBER_NOT_FOUND,
    });
  };

export { driverLicenseScanHandler };
