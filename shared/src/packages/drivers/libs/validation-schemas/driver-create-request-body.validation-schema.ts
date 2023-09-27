import joi from 'joi';

import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';

import { DriverValidationMessage } from '../enums/enums.js';
import { type DriverCreateRequestDto } from '../types/types.js';
import { driverLicenseNumber } from './driver-update-request-body.validation-schema.js';

const { phone, email, firstName, lastName } = commonSignUpRules;

const driverCreateRequestBody = joi.object<DriverCreateRequestDto, true>({
  phone,
  email,
  firstName,
  lastName,
  driverLicenseNumber,
  truckIds: joi.array().items(joi.number()).min(1).required().messages({
    'any.required': DriverValidationMessage.TRUCK_IS_REQUIRED,
    'array.min': DriverValidationMessage.TRUCK_IS_REQUIRED,
  }),
});

export { driverCreateRequestBody };
