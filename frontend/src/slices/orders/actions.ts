import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderCreateRequestDto,
  type OrderCreateResponseDto,
} from '~/packages/orders/orders.js';

import { name as sliceName } from './order.slice.js';

const createOrder = createAsyncThunk<
  OrderCreateResponseDto,
  OrderCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-order`, (payload, { extra }) => {
  const { ordersApi } = extra;

  // FIXME
  return ordersApi.createOrder({ ...payload, driverId: 1 });
});

export { createOrder };
