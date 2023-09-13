export {
  TruckApiPath,
  TruckCapacity,
  TruckLicensePlateNumber,
  TruckManufacturer,
  TruckPricePerKm,
  TruckTowType,
  TruckValidationMessage,
  TruckYear,
} from './libs/enums/enums.js';
export { LICENSE_PLATE_NUMBER } from './libs/regex-patterns/regex-patterns.js';
export {
  type BusinessGetAllTrucksRequestParameters,
  type TruckAddFormPayload,
  type TruckAddRequestDto,
  type TruckEntity,
  type TruckGetAllResponseDto,
} from './libs/types/types.js';
export {
  businessGetAllTrucksParameters,
  truckCreateForm,
  truckCreateRequestBody,
  truckGetParameters,
  truckUpdateRequestBody,
} from './libs/validation-schemas/validation-schema.js';
