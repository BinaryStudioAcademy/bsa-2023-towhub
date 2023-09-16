import joi from 'joi';

import { type UpdateFileKeyRequestParameters } from '../types/request/request.js';
import { filesIdRequestParameter } from './files-id-request-parameter.validation-schema.js';

const filesUpdateKeyRequestParameters = joi.object<
  UpdateFileKeyRequestParameters,
  true
>({
  ...filesIdRequestParameter,
});

export { filesUpdateKeyRequestParameters };
