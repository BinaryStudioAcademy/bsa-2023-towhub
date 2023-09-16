import joi from 'joi';

import { type GetFileRequestParameters } from '../types/request/request.js';
import { filesIdRequestParameter } from './files-id-request-parameter.validation-schema.js';

const filesGetRequestParameters = joi.object<GetFileRequestParameters, true>({
  ...filesIdRequestParameter,
});

export { filesGetRequestParameters };
