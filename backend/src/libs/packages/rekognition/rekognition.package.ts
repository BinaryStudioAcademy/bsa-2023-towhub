import {
  type DetectTextCommandInput,
  type TextDetection,
  Rekognition,
} from '@aws-sdk/client-rekognition';

import { type IConfig } from '~/libs/packages/config/libs/interfaces/interfaces.js';
import { type ILogger } from '~/libs/packages/logger/libs/interfaces/interfaces.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
};

class RekognitionService {
  private rekognitionClient: Rekognition;

  private bucketName: string;

  private logger: ILogger;

  public constructor({ config, logger }: Constructor) {
    this.rekognitionClient = new Rekognition({
      credentials: {
        accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
      },
      region: config.ENV.AWS.S3.REGION,
    });
    this.bucketName = config.ENV.AWS.S3.BUCKET_NAME;
    this.logger = logger;
  }

  public async detectText({
    fileKey,
    pattern,
  }: {
    fileKey: string;
    pattern: string | RegExp;
  }): Promise<boolean> {
    const parameters: DetectTextCommandInput = {
      Image: {
        S3Object: {
          Bucket: this.bucketName,
          Name: fileKey,
        },
      },
    };

    try {
      const response = await this.rekognitionClient.detectText(parameters);

      return response.TextDetections
        ? response.TextDetections.some((detection: TextDetection): boolean => {
            return detection.DetectedText
              ? new RegExp(pattern).test(detection.DetectedText)
              : false;
          })
        : false;
    } catch (error_: unknown) {
      const error = error_ as Error;
      this.logger.error(error.message);

      return false;
    }
  }
}

export { RekognitionService };
