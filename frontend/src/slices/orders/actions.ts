import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type OrderFindByIdResponseDto } from '~/packages/orders/libs/types/types.js';

import { name as sliceName } from './orders.slice.js';

const getOrder = createAsyncThunk<
  OrderFindByIdResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/get-order`, (orderId, { extra }) => {
  const { orderApi } = extra;

  return orderApi.getOrder(orderId);
});

export { getOrder };
