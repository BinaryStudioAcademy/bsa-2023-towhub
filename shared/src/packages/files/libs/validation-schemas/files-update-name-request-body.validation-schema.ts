import joi from 'joi';

import { FilesValidationMessage } from '../enums/enums.js';
import { type UpdateFileNameRequestDto } from '../types/request/update-file-name-request-dto.type.js';

const filesUpdateNameRequestBody = joi.object<UpdateFileNameRequestDto, true>({
  key: joi
    .string()
    .trim()
    .regex(/^\w(?:[\w .-]*\w)?\.[\w-]+$/)
    .required()
    .messages({
      'string.empty': FilesValidationMessage.KEY_REQUIRED,
      'string.regex': FilesValidationMessage.INVALID_KEY,
    }),
});

export { filesUpdateNameRequestBody };
