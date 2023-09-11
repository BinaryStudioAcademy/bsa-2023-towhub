import joi from 'joi';

import { type DeleteFileRequestParameters } from '../types/request/request.js';
import { filesIdRequestParameter } from './files-id-request-parameter.validation-schema.js';

const filesDeleteRequestParameters = joi.object<
  DeleteFileRequestParameters,
  true
>({
  ...filesIdRequestParameter,
});

export { filesDeleteRequestParameters };
