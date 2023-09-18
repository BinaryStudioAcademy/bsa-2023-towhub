export {
  TruckApiPath,
  TruckCapacity,
  TruckCarsQuantity,
  TruckLicensePlateNumber,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckValidationMessage,
  TruckYear,
} from './libs/enums/enums.js';
export { LICENSE_PLATE_NUMBER } from './libs/regex-patterns/regex-patterns.js';
export { type TruckEntity } from './libs/types/types.js';
export {
  truckCreateRequestBody,
  truckGetParameters,
  truckUpdateRequestBody,
  userTrucksRequestBody,
} from './libs/validation-schemas/validation-schema.js';
