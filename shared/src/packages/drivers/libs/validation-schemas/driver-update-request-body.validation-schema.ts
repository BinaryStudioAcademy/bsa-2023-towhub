import joi from 'joi';

import {
  type FileObject,
  type MultipartParsedFile,
} from '~/packages/files/libs/types/types.js';
import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverUpdateRequestDto } from '../types/types.js';

const driverLicenseNumber = joi
  .string()
  .trim()
  .regex(UserValidationRule.DRIVER_LICENSE_NUMBER)
  .required()
  .messages({
    'string.empty': DriverValidationMessage.DRIVER_LICENSE_NUMBER_REQUIRED,
  });

const driverUpdateRequestBody = joi.object<
  DriverUpdateRequestDto<MultipartParsedFile | FileObject>,
  true
>({
  ...commonSignUpRules,
  driverLicenseNumber,
  truckIds: joi.array().items(joi.number()),
  files: joi.array().items(joi.object()).min(1).required().messages({
    'array.min': DriverValidationMessage.FILES_MIN_LENGTH,
  }),
});

export { driverLicenseNumber, driverUpdateRequestBody };
