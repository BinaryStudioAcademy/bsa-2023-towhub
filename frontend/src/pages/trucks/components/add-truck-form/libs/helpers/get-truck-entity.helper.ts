import {
  type TruckEntity,
  type TruckFormModel,
} from '~/packages/trucks/libs/types/types.js';

function getTruckEntity(payload: TruckFormModel): Omit<TruckEntity, 'id'> {
  const { ...truckDetails } = payload;

  return {
    ...truckDetails,
    manufacturer: truckDetails.manufacturer.value,
    towType: truckDetails.towType.value,
  };
}

export { getTruckEntity };
