export {
  TruckApiPath,
  TruckCapacity,
  TruckLicensePlateNumber,
  TruckManufacturer,
  TruckPricePerKm,
  TruckStatus,
  TruckTowType,
  TruckValidationMessage,
  TruckYear,
} from './libs/enums/enums.js';
export { LICENSE_PLATE_NUMBER } from './libs/regex-patterns/regex-patterns.js';
export { type TruckEntityT } from './libs/types/types.js';
export {
  truckCreateRequestBody,
  truckGetParameters,
  truckUpdateRequestBody,
} from './libs/validation-schemas/validation-schema.js';
