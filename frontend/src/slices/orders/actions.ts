import { createAsyncThunk } from '@reduxjs/toolkit';
import { type OrderResponseDto } from 'shared/build/index.js';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';

import { name as sliceName } from './orders.slice.js';

const getOrders = createAsyncThunk<
  OrderResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/orders`, async (thunkAPI, { extra, rejectWithValue }) => {
  try {
    const { orderApi } = extra;

    return await orderApi.getOrders();
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export { getOrders };
