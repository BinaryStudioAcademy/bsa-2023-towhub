import joi from 'joi';

import { FilesValidationMessage } from '../enums/enums.js';
import { type DeleteFileRequestParameters } from '../types/request/request.js';

const filesDeleteRequestParameters = joi.object<
  DeleteFileRequestParameters,
  true
>({
  id: joi.number().integer().positive().required().messages({
    'number.required': FilesValidationMessage.ID_REQUIRED,
  }),
});

export { filesDeleteRequestParameters };
