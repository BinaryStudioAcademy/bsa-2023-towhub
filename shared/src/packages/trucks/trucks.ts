export {
  FormLabel,
  FormName,
  TruckApiPath,
  TruckCapacity,
  TruckLicensePlateNumber,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckValidationMessage,
  TruckYear,
} from './libs/enums/enums.js';
export { type TruckEntity } from './libs/types/types.js';
export {
  truckCreateRequestBody,
  truckIdParameter,
  truckUpdateRequestBody,
} from './libs/validation-schemas/validation-schema.js';
export { LICENSE_PLATE_NUMBER } from './regex-patterns/regex-patterns.js';
