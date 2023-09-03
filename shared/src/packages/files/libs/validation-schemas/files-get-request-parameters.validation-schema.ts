import joi from 'joi';

import { FilesValidationMessage } from '../enums/enums.js';
import { type GetFileRequestParameters } from '../types/request/request.js';

const filesGetRequestParameters = joi.object<GetFileRequestParameters, true>({
  id: joi.number().integer().positive().required().messages({
    'number.required': FilesValidationMessage.ID_REQUIRED,
  }),
});

export { filesGetRequestParameters };
