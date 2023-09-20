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

const truckUpdateRequestBody = joi.object<
  Omit<TruckEntity, 'id' | 'businessId'>,
  true
>({
  manufacturer: joi
    .string()
    .valid(...Object.values(TruckManufacturer))
    .messages({
      'any.only': TruckValidationMessage.REQUIRED,
    }),

  capacity: joi
    .number()
    .min(TruckCapacity.MIN)
    .max(TruckCapacity.MAX)
    .required()
    .messages({
      'number.base': TruckValidationMessage.INVALID,
      'number.min': TruckValidationMessage.INVALID,
      'number.max': TruckValidationMessage.INVALID,
    }),

  pricePerKm: joi
    .number()
    .precision(1)
    .min(TruckPricePerKm.MIN)
    .max(TruckPricePerKm.MAX)
    .messages({
      'number.base': TruckValidationMessage.NUMBER_INVALID,
      'number.min': TruckValidationMessage.NUMBER_INVALID,
      'number.max': TruckValidationMessage.NUMBER_INVALID,
    }),

  licensePlateNumber: joi
    .string()
    .trim()
    .min(TruckLicensePlateNumber.MIN)
    .max(TruckLicensePlateNumber.MAX)
    .pattern(LICENSE_PLATE_NUMBER)
    .messages({
      'string.empty': TruckValidationMessage.REQUIRED,
      'string.pattern.base': TruckValidationMessage.LICENSE_PLATE_INVALID,
    }),

  year: joi.number().min(TruckYear.MIN).max(TruckYear.MAX).messages({
    'number.base': TruckValidationMessage.YEAR_INVALID,
    'number.min': TruckValidationMessage.YEAR_INVALID,
    'number.max': TruckValidationMessage.YEAR_INVALID,
  }),

  towType: joi
    .string()
    .valid(...Object.values(TruckTowType))
    .messages({
      'any.only': TruckValidationMessage.INVALID,
    }),
});

export { truckUpdateRequestBody };
