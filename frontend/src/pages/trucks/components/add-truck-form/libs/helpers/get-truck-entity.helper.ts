import {
  type TruckEntity,
  type TruckFormModel,
} from '~/packages/trucks/libs/types/types.js';

function getTruckEntity(
  payload: TruckFormModel,
): Omit<TruckEntity, 'id' | 'businessId'> {
  return {
    ...payload,
    manufacturer: payload.manufacturer.value,
    towType: payload.towType.value,
  };
}

export { getTruckEntity };
