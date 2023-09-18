import {
  type DeleteObjectCommandOutput,
  type PutObjectCommandOutput,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { type ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface';

import { type IConfig } from '../config/libs/interfaces/interfaces.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
};

class S3ClientService {
  private s3Client: S3Client;

  private bucketName: string;

  private signedUrlExpiresIn: number;

  private logger: ILogger;

  public constructor({ config, logger }: Constructor) {
    this.s3Client = new S3Client({
      region: config.ENV.AWS.S3.REGION,
      credentials: {
        accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = config.ENV.AWS.S3.BUCKET_NAME;
    this.signedUrlExpiresIn = config.ENV.AWS.S3.SIGNED_URL_EXPIRES_IN_SECONDS;
    this.logger = logger;
  }

  public async getObjectBuffer(key: string): Promise<Buffer | null> {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    const result = await this.s3Client.send(command);
    this.logger.info(`Get object (byte array): request sent. Key: "${key}"`);

    if (!result.Body) {
      return null;
    }

    const intArrayContent = await result.Body.transformToByteArray();

    return Buffer.from(intArrayContent);
  }

  public async getObjectPresignedUrl(
    key: string,
    expiresIn: number = this.signedUrlExpiresIn,
  ): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn,
    });
    this.logger.info(`Get object (presigned URL): request sent. Key: "${key}"`);

    return url;
  }

  public async putObject(
    key: string,
    body: Buffer,
  ): Promise<PutObjectCommandOutput> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
    });
    const result = await this.s3Client.send(command);
    this.logger.info(`Put object: request sent. Key: "${key}"`);

    return result;
  }

  public async updateObjectKey(
    oldKey: string,
    newKey: string,
  ): Promise<PutObjectCommandOutput | null> {
    const oldObject = await this.getObjectBuffer(oldKey);

    if (!oldObject) {
      return null;
    }

    await this.deleteObject(oldKey);

    return await this.putObject(newKey, oldObject);
  }

  public async deleteObject(key: string): Promise<DeleteObjectCommandOutput> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const result = await this.s3Client.send(command);
    this.logger.info(
      `Delete object (presigned URL): request sent. Key: "${key}"`,
    );

    return result;
  }
}

export { S3ClientService };
