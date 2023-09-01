export {
  FormLabel,
  FormName,
  TruckApiPath,
  TruckManufacturer,
  TruckTowType,
  TruckYear,
} from './libs/enums/enums.js';
export {
  type TruckAddRequestDto,
  type TruckEntity,
} from './libs/types/types.js';
export {
  truckAddValidationSchema,
  truckIdParameterValidationSchema,
  truckRequestBodyValidationSchema,
  truckUpdateRequestBodyValidationSchema,
} from './libs/validation-schemas/validation-schema.js';
