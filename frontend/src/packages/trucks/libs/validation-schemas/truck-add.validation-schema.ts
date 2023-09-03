import joi from 'joi';

import {
  FormLabel,
  TruckCapacity,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckYear,
} from '../enums/enums.js';
import { type TruckFormModel } from '../types/types.js';

const truckAddValidationSchema = joi.object<TruckFormModel, true>({
  manufacturer: joi.object({
    label: joi.string().required(),
    value: joi.valid(...Object.values(TruckManufacturer)).messages({
      'any.only': `Invalid ${FormLabel.MANUFACTURER}`,
      'any.required': `${FormLabel.MANUFACTURER} is required`,
    }),
  }),

  capacity: joi
    .number()
    .min(TruckCapacity.MIN)
    .required()
    .messages({
      'number.base': `${FormLabel.CAPACITY} must be a number`,
      'number.min': `${FormLabel.CAPACITY} must be at least ${TruckCapacity.MIN}`,
    }),

  pricePerKm: joi
    .number()
    .precision(1)
    .min(TruckPricePerKm.MIN)
    .max(TruckPricePerKm.MAX)
    .required()
    .messages({
      'number.base': `${FormLabel.PRICE_PER_KM} must be a number`,
      'number.min': `${FormLabel.PRICE_PER_KM} must be at least ${TruckPricePerKm.MIN}`,
      'number.max': `${FormLabel.PRICE_PER_KM} must be at most ${TruckPricePerKm.MAX}`,
    }),

  licensePlateNumber: joi
    .string()
    .trim()
    .pattern(/^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/)
    .required()
    .messages({
      'string.empty': `${FormLabel.LICENSE_PLATE} is required`,
      'string.pattern.base': `Invalid ${FormLabel.LICENSE_PLATE}`,
    }),

  year: joi
    .number()
    .min(TruckYear.MIN)
    .max(TruckYear.MAX)
    .messages({
      'number.base': `${FormLabel.YEAR} must be a number`,
      'number.min': `${FormLabel.YEAR} must be at least ${TruckYear.MIN}`,
    }),

  towType: joi.object({
    label: joi.string().required(),
    value: joi.valid(...Object.values(TruckTowType)).messages({
      'any.only': `Invalid ${FormLabel.TOW_TYPE}`,
      'any.required': `${FormLabel.TOW_TYPE} is required`,
    }),
  }),

  drivers: joi.string(),
});

export { truckAddValidationSchema };
