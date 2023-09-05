import joi from 'joi';

import {
  TruckCapacity,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckValidationMessage,
  TruckYear,
} from '../enums/enums.js';
import { type TruckFormModel } from '../types/types.js';
import { LICENSE_PLATE_NUMBER_REGEX } from './validation-schemas.js';

const truck = joi.object<TruckFormModel, true>({
  manufacturer: joi
    .object({
      label: joi.string().required(),
      value: joi.valid(...Object.values(TruckManufacturer)).messages({
        'any.only': TruckValidationMessage.INVALID,
      }),
    })
    .required()
    .messages({
      'any.required': TruckValidationMessage.REQUIRED,
    }),

  capacity: joi
    .number()
    .min(TruckCapacity.MIN)
    .max(TruckCapacity.MAX)
    .required()
    .messages({
      'number.base': TruckValidationMessage.REQUIRED,
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
      'number.base': TruckValidationMessage.REQUIRED,
      'number.min': TruckValidationMessage.NUMBER_INVALID,
      'number.max': TruckValidationMessage.NUMBER_INVALID,
      'any.required': TruckValidationMessage.REQUIRED,
    }),

  licensePlateNumber: joi
    .string()
    .trim()
    .min(3)
    .max(10)
    .pattern(LICENSE_PLATE_NUMBER_REGEX)
    .required()
    .messages({
      'string.empty': TruckValidationMessage.REQUIRED,
      'any.required': TruckValidationMessage.REQUIRED,
      'string.pattern.base': TruckValidationMessage.LICENSE_PLATE_INVALID,
      'string.min': TruckValidationMessage.LICENSE_PLATE_INVALID,
      'string.max': TruckValidationMessage.LICENSE_PLATE_INVALID,
    }),

  year: joi.number().min(TruckYear.MIN).max(TruckYear.MAX).required().messages({
    'number.base': TruckValidationMessage.REQUIRED,
    'number.min': TruckValidationMessage.YEAR_INVALID,
    'number.max': TruckValidationMessage.YEAR_INVALID,
    'any.required': TruckValidationMessage.REQUIRED,
  }),

  towType: joi
    .object({
      label: joi.string().required(),
      value: joi.valid(...Object.values(TruckTowType)).messages({
        'any.only': TruckValidationMessage.INVALID,
      }),
    })
    .required()
    .messages({ 'any.required': TruckValidationMessage.REQUIRED }),
});

export { truck };
