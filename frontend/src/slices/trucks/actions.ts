import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import {
  type AsyncThunkConfig,
  type PaginationPayload,
} from '~/libs/types/types.js';
import { TruckSuccessfulMessage } from '~/packages/trucks/libs/enums/enums.js';
import {
  type TruckAddRequestDto,
  type TruckEntity,
} from '~/packages/trucks/libs/types/types.js';

import { name as sliceName } from './trucks.slice.js';

const addTruck = createAsyncThunk<
  TruckEntity,
  TruckAddRequestDto,
  AsyncThunkConfig
>(`${sliceName}/add-truck`, (payload, { extra }) => {
  const { truckApi, notification } = extra;

  try {
    const truck = truckApi.addTruck(payload);
    notification.success(TruckSuccessfulMessage.ADD_NEW_TRUCK);

    return truck;
  } catch (error) {
    notification.warning(getErrorMessage(error));
    throw error;
  }
});

const findAllTrucksForBusiness = createAsyncThunk<
  { items: TruckEntity[]; total: number },
  Pick<TruckEntity, 'businessId'> & PaginationPayload,
  AsyncThunkConfig
>(`${sliceName}/find-all-trucks-for-business`, (payload, { extra }) => {
  const { businessId, pageIndex, pageSize } = payload;
  const { businessApi, notification } = extra;

  try {
    return businessApi.findAllTrucksByBusinessId(businessId, {
      pageIndex,
      pageSize,
    });
  } catch (error) {
    notification.warning(getErrorMessage(error));
    throw error;
  }
});

export { addTruck, findAllTrucksForBusiness };
