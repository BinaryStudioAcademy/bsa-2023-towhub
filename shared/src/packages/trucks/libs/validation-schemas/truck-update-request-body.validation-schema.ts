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

const truckUpdateRequestBody = joi.object<Omit<TruckEntity, 'id'>, true>({
  manufacturer: joi
    .string()
    .valid(...Object.values(TruckManufacturer))
    .messages({
      'any.only': TruckValidationMessage.MANUFACTURER_INVALID,
    }),

  capacity: joi.number().min(TruckCapacity.MIN).messages({
    'number.base': TruckValidationMessage.CAPACITY_NOT_A_NUMBER,
    'number.min': TruckValidationMessage.CAPACITY_MINIMUM,
  }),

  pricePerKm: joi
    .number()
    .precision(1)
    .min(TruckPricePerKm.MIN)
    .max(TruckPricePerKm.MAX)
    .messages({
      'number.base': TruckValidationMessage.PRICE_PER_KM_NOT_A_NUMBER,
      'number.min': TruckValidationMessage.PRICE_PER_KM_MINIMUM,
      'number.max': TruckValidationMessage.PRICE_PER_KM_MAXIMUM,
    }),

  licensePlateNumber: joi
    .string()
    .trim()
    .pattern(LICENSE_PLATE_NUMBER_REGEX)
    .messages({
      'string.empty': TruckValidationMessage.LICENSE_PLATE_EMPTY,
      'string.pattern.base': TruckValidationMessage.LICENSE_PLATE_INVALID,
    }),

  year: joi.number().min(TruckYear.MIN).max(TruckYear.MAX).messages({
    'number.base': TruckValidationMessage.YEAR_NOT_A_NUMBER,
    'number.min': TruckValidationMessage.YEAR_MINIMUM,
    'number.max': TruckValidationMessage.YEAR_MAXIMUM,
  }),

  towType: joi
    .string()
    .valid(...Object.values(TruckTowType))
    .messages({
      'any.only': TruckValidationMessage.TOW_TYPE_INVALID,
    }),
});

export { truckUpdateRequestBody };
