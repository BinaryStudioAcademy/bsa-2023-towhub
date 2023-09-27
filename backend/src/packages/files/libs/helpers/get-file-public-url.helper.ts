import { config } from '~/libs/packages/config/config.js';

import {
  BUCKET_NAME_TAG,
  S3_BASE_URL_TEMPLATE,
} from '../constants/constants.js';

const getFilePublicUrl = (path: string): string => {
  const s3BaseUrl = S3_BASE_URL_TEMPLATE.replace(
    BUCKET_NAME_TAG,
    config.ENV.AWS.S3.BUCKET_NAME,
  );

  return new URL(path, s3BaseUrl).href;
};

export { getFilePublicUrl };
