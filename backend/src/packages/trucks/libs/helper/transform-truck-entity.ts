import { type ValueOf } from '~/libs/types/types.js';

import { type TruckManufacturer, type TruckTowType } from '../enums/enums.js';
import { type TruckEntity, type TruckEntityT } from '../types/types.js';

function transformTruckEntity(truck: TruckEntity): TruckEntityT {
  return {
    id: truck.id,
    manufacturer: truck.manufacturer as ValueOf<typeof TruckManufacturer>,
    towType: truck.towType as ValueOf<typeof TruckTowType>,
    year: truck.year,
    licensePlateNumber: truck.licensePlateNumber,
    capacity: truck.capacity,
    pricePerKm: truck.pricePerKm,
  };
}

function reverseTransformTruckEntity(truckT: TruckEntityT): TruckEntity {
  return {
    id: truckT.id,
    manufacturer: truckT.manufacturer,
    towType: truckT.towType,
    year: truckT.year,
    licensePlateNumber: truckT.licensePlateNumber,
    capacity: truckT.capacity,
    pricePerKm: truckT.pricePerKm,
  };
}

export { reverseTransformTruckEntity, transformTruckEntity };
