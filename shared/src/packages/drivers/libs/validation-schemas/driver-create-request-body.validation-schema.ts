import joi from 'joi';

import { pluralizeString } from '~/libs/helpers/helpers.js';
import {
  type FileObject,
  type MultipartParsedFile,
} from '~/packages/files/libs/types/types.js';
import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverCreateRequestDto } from '../types/types.js';
import { driverLicenseNumber } from './driver-update-request-body.validation-schema.js';

const { phone, email, firstName, lastName } = commonSignUpRules;

const driverCreateRequestBody = joi.object<
  DriverCreateRequestDto<MultipartParsedFile | FileObject>,
  true
>({
  phone,
  email,
  firstName,
  lastName,
  driverLicenseNumber,
  truckIds: joi.array().items(joi.number()).min(1).required().messages({
    'any.required': DriverValidationMessage.TRUCK_IS_REQUIRED,
    'array.min': DriverValidationMessage.TRUCK_IS_REQUIRED,
  }),
  files: joi
    .array()
    .items(joi.object())
    .min(1)
    .required()
    .messages({
      'array.min': `Choose at least 1 ${pluralizeString('file', 1)}`,
    }),
});

export { driverCreateRequestBody };
