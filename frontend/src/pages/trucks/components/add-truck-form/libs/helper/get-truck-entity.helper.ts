import {
  type TruckEntity,
  type TruckFormModel,
} from '~/packages/trucks/libs/types/types.js';

function getTruckEntity(payload: TruckFormModel): Omit<TruckEntity, 'id'> {
  return {
    manufacturer: payload.manufacturer.value,
    year: payload.year,
    towType: payload.towType.value,
    capacity: payload.capacity,
    pricePerKm: payload.pricePerKm,
    licensePlateNumber: payload.licensePlateNumber,
  };
}

export { getTruckEntity };
