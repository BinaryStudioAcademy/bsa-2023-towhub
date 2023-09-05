import { FormLabel } from './form.enum.js';
import { TruckCapacity } from './truck-capacity.enum.js';
import { TruckPricePerKm } from './truck-price-per-km.enum.js';
import { TruckYear } from './truck-year.enum.js';

const TruckValidationMessage = {
  MANUFACTURER_INVALID: `Invalid ${FormLabel.MANUFACTURER}`,
  MANUFACTURER_REQUIRED: `${FormLabel.MANUFACTURER} is required`,
  CAPACITY_NOT_A_NUMBER: `${FormLabel.CAPACITY} must be a number`,
  CAPACITY_REQUIRED: `${FormLabel.CAPACITY} is required`,
  CAPACITY_MINIMUM: `${FormLabel.CAPACITY} must be at least ${TruckCapacity.MIN}`,
  PRICE_PER_KM_NOT_A_NUMBER: `${FormLabel.PRICE_PER_KM} must be a number`,
  PRICE_PER_KM_MINIMUM: `${FormLabel.PRICE_PER_KM} must be at least ${TruckPricePerKm.MIN}`,
  PRICE_PER_KM_MAXIMUM: `${FormLabel.PRICE_PER_KM} must be at most ${TruckPricePerKm.MAX}`,
  PRICE_PER_KM_REQUIRED: `${FormLabel.PRICE_PER_KM} is required`,
  LICENSE_PLATE_EMPTY: `${FormLabel.LICENSE_PLATE} is required`,
  LICENSE_PLATE_INVALID: `${FormLabel.LICENSE_PLATE} must be in format AA0000AA`,
  LICENSE_PLATE_REQUIRED: `${FormLabel.LICENSE_PLATE} is required`,
  YEAR_NOT_A_NUMBER: `${FormLabel.YEAR} must be a number`,
  YEAR_MINIMUM: `${FormLabel.YEAR} must be at least ${TruckYear.MIN}`,
  YEAR_MAXIMUM: `${FormLabel.YEAR} must be at most ${TruckYear.MAX}`,
  YEAR_REQUIRED: `${FormLabel.YEAR} is required`,
  TOW_TYPE_INVALID: `Invalid ${FormLabel.TOW_TYPE}`,
  TOW_TYPE_REQUIRED: `${FormLabel.TOW_TYPE} is required`,
  ID_NOT_A_NUMBER: `${FormLabel.PRICE_PER_KM} must be a number`,
} as const;

export { TruckValidationMessage };
