import joi from 'joi';

import {
  TruckCapacity,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckYear,
} from '../enums/enums.js';
import { TruckValidationMessage } from '../enums/truck-validation-message.enum.js';
import { type TruckEntity } from '../types/types.js';
import { LICENSE_PLATE_NUMBER_REGEX } from './validation-schema.js';

const truckCreateRequestBody = joi.object<Omit<TruckEntity, 'id'>, true>({
  manufacturer: joi
    .string()
    .required()
    .valid(...Object.values(TruckManufacturer))
    .messages({
      'any.only': TruckValidationMessage.MANUFACTURER_INVALID,
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
    .string()
    .required()
    .valid(...Object.values(TruckTowType))
    .messages({
      'any.only': TruckValidationMessage.TOW_TYPE_INVALID,
      'any.required': TruckValidationMessage.TOW_TYPE_REQUIRED,
    }),
});

export { truckCreateRequestBody };
