import joi from 'joi';

import { FilesValidationMessage } from '../enums/enums.js';
import { type UpdateFileNameRequestParameters } from '../types/request/request.js';

const filesUpdateNameRequestParameters = joi.object<
  UpdateFileNameRequestParameters,
  true
>({
  id: joi.number().integer().positive().required().messages({
    'number.required': FilesValidationMessage.ID_REQUIRED,
  }),
});

export { filesUpdateNameRequestParameters };
