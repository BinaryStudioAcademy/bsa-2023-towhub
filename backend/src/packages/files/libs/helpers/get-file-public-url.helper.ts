import { config } from '~/libs/packages/config/config.js';

import {
  BUCKET_NAME_TAG,
  PATH_SEPARATOR,
  S3_BASE_URL_TEMPLATE,
} from '../constants/constants.js';

const getFilePublicUrl = (path: string): string => {
  const s3BaseUrl = S3_BASE_URL_TEMPLATE.replace(
    BUCKET_NAME_TAG,
    config.ENV.AWS.S3.BUCKET_NAME,
  );

  return [s3BaseUrl, path].join(PATH_SEPARATOR);
};

export { getFilePublicUrl };
