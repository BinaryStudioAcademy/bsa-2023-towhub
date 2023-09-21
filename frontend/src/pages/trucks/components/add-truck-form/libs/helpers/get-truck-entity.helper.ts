import {
  type TruckEntityT,
  type TruckFormModel,
} from '~/packages/trucks/libs/types/types.js';

function getTruckEntity(
  payload: TruckFormModel,
): Omit<TruckEntityT, 'id' | 'status' | 'businessId'> {
  return {
    ...payload,
    manufacturer: payload.manufacturer.value,
    towType: payload.towType.value,
  };
}

export { getTruckEntity };
