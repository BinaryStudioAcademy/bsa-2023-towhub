import joi from 'joi';

import { pluralizeString } from '~/libs/helpers/helpers.js';
import {
  type FileObject,
  type MultipartParsedFile,
} from '~/packages/files/libs/types/types.js';
import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverCreateUpdateRequestDto } from '../types/types.js';

const driverCreateUpdateRequestBody = joi.object<
  DriverCreateUpdateRequestDto & {
    files: (MultipartParsedFile | FileObject)[];
  },
  true
>({
  ...commonSignUpRules,
  driverLicenseNumber: joi
    .string()
    .trim()
    .regex(UserValidationRule.DRIVER_LICENSE_NUMBER)
    .required()
    .messages({
      'string.empty': DriverValidationMessage.DRIVER_LICENSE_NUMBER_REQUIRED,
    }),

  truckIds: joi.array().items(joi.number()),
  files: joi
    .array()
    .items(joi.object())
    .min(1)
    .required()
    .messages({
      'array.min': `Choose at least 1 ${pluralizeString('file', 1)}`,
    }),
});

export { driverCreateUpdateRequestBody };
