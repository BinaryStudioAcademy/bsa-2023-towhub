import joi from 'joi';

import { commonSignUpRules } from '~/packages/users/libs/validation-schemas/common-rules/common-rules.js';

import { type DriverCreateUpdateRequestDto } from '../types/types.js';
import { driverLicenseNumber } from './driver-update-request-body.validation-schema.js';

const { phone, email, firstName, lastName } = commonSignUpRules;

const driverCreateRequestBody = joi.object<
  Omit<DriverCreateUpdateRequestDto, 'password'>,
  true
>({
  phone,
  email,
  firstName,
  lastName,
  driverLicenseNumber,
  truckIds: joi.array().items(joi.number()),
});

export { driverCreateRequestBody };
