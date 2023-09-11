import joi from 'joi';

import { FilesValidationMessage } from '../enums/enums.js';
import { type UpdateFileKeyRequestDto } from '../types/request/update-file-name-request-dto.type.js';

const filesUpdateKeyRequestBody = joi.object<UpdateFileKeyRequestDto, true>({
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

export { filesUpdateKeyRequestBody };
