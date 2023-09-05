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
        'any.only': TruckValidationMessage.MANUFACTURER_INVALID,
      }),
    })
    .required()
    .messages({
      'any.required': TruckValidationMessage.MANUFACTURER_REQUIRED,
    }),

  capacity: joi.number().min(TruckCapacity.MIN).required().messages({
    'number.base': TruckValidationMessage.CAPACITY_NOT_A_NUMBER,
    'number.min': TruckValidationMessage.CAPACITY_MINIMUM,
    'any.required': TruckValidationMessage.CAPACITY_REQUIRED,
  }),

  pricePerKm: joi
    .number()
    .precision(1)
    .min(TruckPricePerKm.MIN)
    .max(TruckPricePerKm.MAX)
    .required()
    .messages({
      'number.base': TruckValidationMessage.PRICE_PER_KM_NOT_A_NUMBER,
      'number.min': TruckValidationMessage.PRICE_PER_KM_MINIMUM,
      'number.max': TruckValidationMessage.PRICE_PER_KM_MAXIMUM,
      'any.required': TruckValidationMessage.PRICE_PER_KM_REQUIRED,
    }),

  licensePlateNumber: joi
    .string()
    .trim()
    .pattern(LICENSE_PLATE_NUMBER_REGEX)
    .required()
    .messages({
      'string.empty': TruckValidationMessage.LICENSE_PLATE_EMPTY,
      'string.pattern.base': TruckValidationMessage.LICENSE_PLATE_INVALID,
      'any.required': TruckValidationMessage.LICENSE_PLATE_REQUIRED,
    }),

  year: joi.number().min(TruckYear.MIN).max(TruckYear.MAX).required().messages({
    'number.base': TruckValidationMessage.YEAR_NOT_A_NUMBER,
    'number.min': TruckValidationMessage.YEAR_MINIMUM,
    'number.max': TruckValidationMessage.YEAR_MAXIMUM,
    'any.required': TruckValidationMessage.YEAR_REQUIRED,
  }),

  towType: joi
    .object({
      label: joi.string().required(),
      value: joi.valid(...Object.values(TruckTowType)).messages({
        'any.only': TruckValidationMessage.TOW_TYPE_INVALID,
      }),
    })
    .required()
    .messages({ 'any.required': TruckValidationMessage.TOW_TYPE_REQUIRED }),
});

export { truck };
