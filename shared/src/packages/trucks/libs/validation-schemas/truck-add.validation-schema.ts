import joi from 'joi';

import {
  FormLabel,
  TowTruckType,
  TruckManufacturer,
  TruckYear,
} from '../enums/enums.js';
import { type TruckAddRequestDto } from '../types/truck-add-request-dto.type.js';

const truckAddValidationSchema = joi.object<TruckAddRequestDto>({
  manufacturer: joi
    .string()
    .valid(...Object.keys(TruckManufacturer))
    .required()
    .messages({
      'any.only': `Invalid ${FormLabel.MANUFACTURER}`,
      'any.required': `${FormLabel.MANUFACTURER} is required`,
    }),

  capacity: joi
    .number()
    .min(0)
    .required()
    .messages({
      'number.base': `${FormLabel.CAPACITY} must be a number`,
      'number.min': `${FormLabel.CAPACITY} must be at least 0`,
    }),

  pricePerKm: joi
    .number()
    .precision(2)
    .min(1)
    .max(100)
    .required()
    .messages({
      'number.base': `${FormLabel.PRICE_PER_KM} must be a number`,
      'number.min': `${FormLabel.PRICE_PER_KM} must be at least 1`,
      'number.max': `${FormLabel.PRICE_PER_KM} must be at most 100`,
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
    .string()
    .valid(...Object.keys(TruckYear))
    .required()
    .messages({
      'any.only': `Invalid ${FormLabel.YEAR}`,
      'any.required': `${FormLabel.YEAR} is required`,
    }),

  towType: joi
    .string()
    .valid(...Object.keys(TowTruckType))
    .required()
    .messages({
      'any.only': `Invalid ${FormLabel.TOW_TYPE}`,
      'any.required': `${FormLabel.TOW_TYPE} is required`,
    }),

  drivers: joi.any(),
});

export { truckAddValidationSchema };
