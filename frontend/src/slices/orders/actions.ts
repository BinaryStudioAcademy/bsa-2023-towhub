import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type OrderEntity } from '~/packages/orders/libs/types/types.js';

import { name as sliceName } from './orders.slice.js';

const getOrders = createAsyncThunk<OrderEntity[], undefined, AsyncThunkConfig>(
  `${sliceName}/orders`,
  async (_, { extra }) => {
    const { orderApi } = extra;

    const result = await orderApi.getOrders();

    return result.items;
  },
);

export { getOrders };
