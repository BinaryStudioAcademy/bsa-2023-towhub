import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { notification } from '~/libs/packages/notification/notification.js';
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

  try {
    const result = ordersApi.createOrder(payload);

    notification.success('Order successfully created');

    return result;
  } catch (error) {
    notification.warning(getErrorMessage(error));
    throw error;
  }
});

export { createOrder };
