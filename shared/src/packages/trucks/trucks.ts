export {
  FormLabel,
  FormName,
  TruckApiPath,
  TruckCapacity,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckYear,
} from './libs/enums/enums.js';
export { type TruckEntity } from './libs/types/types.js';
export {
  truckCreateRequestBodyValidationSchema,
  truckIdParameterValidationSchema,
  truckUpdateRequestBodyValidationSchema,
} from './libs/validation-schemas/validation-schema.js';
