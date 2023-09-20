import joi from 'joi';

import {
  TruckCapacity,
  TruckLicensePlateNumber,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckYear,
} from '../enums/enums.js';
import { TruckValidationMessage } from '../enums/truck-validation-message.enum.js';
import { LICENSE_PLATE_NUMBER } from '../regex-patterns/regex-patterns.js';
import { type TruckEntity } from '../types/types.js';

const truckCreateRequestBody = joi.object<
  Omit<TruckEntity, 'id' | 'businessId'>,
  true
>({
  manufacturer: joi
    .string()
    .required()
    .valid(...Object.values(TruckManufacturer))
    .messages({
      'any.only': TruckValidationMessage.INVALID,
      'any.required': TruckValidationMessage.REQUIRED,
    }),

  capacity: joi
    .number()
    .min(TruckCapacity.MIN)
    .max(TruckCapacity.MAX)
    .required()
    .messages({
      'number.base': TruckValidationMessage.NUMBER_INVALID,
      'number.min': TruckValidationMessage.NUMBER_INVALID,
      'number.max': TruckValidationMessage.NUMBER_INVALID,
      'any.required': TruckValidationMessage.REQUIRED,
    }),

  pricePerKm: joi
    .number()
    .precision(1)
    .min(TruckPricePerKm.MIN)
    .max(TruckPricePerKm.MAX)
    .required()
    .messages({
      'number.base': TruckValidationMessage.NUMBER_INVALID,
      'number.min': TruckValidationMessage.NUMBER_INVALID,
      'number.max': TruckValidationMessage.NUMBER_INVALID,
      'any.required': TruckValidationMessage.REQUIRED,
    }),

  licensePlateNumber: joi
    .string()
    .trim()
    .min(TruckLicensePlateNumber.MIN)
    .max(TruckLicensePlateNumber.MAX)
    .pattern(LICENSE_PLATE_NUMBER)
    .required()
    .messages({
      'string.empty': TruckValidationMessage.REQUIRED,
      'any.required': TruckValidationMessage.REQUIRED,
      'string.pattern.base': TruckValidationMessage.LICENSE_PLATE_INVALID,
    }),

  year: joi.number().min(TruckYear.MIN).max(TruckYear.MAX).required().messages({
    'number.base': TruckValidationMessage.YEAR_INVALID,
    'number.min': TruckValidationMessage.YEAR_INVALID,
    'number.max': TruckValidationMessage.YEAR_INVALID,
    'any.required': TruckValidationMessage.REQUIRED,
  }),

  towType: joi
    .string()
    .required()
    .valid(...Object.values(TruckTowType))
    .messages({
      'any.only': TruckValidationMessage.INVALID,
      'any.required': TruckValidationMessage.REQUIRED,
    }),
});

export { truckCreateRequestBody };
