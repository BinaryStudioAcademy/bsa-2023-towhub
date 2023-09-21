import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { notification } from '~/libs/packages/notification/notification.js';
import {
  type AsyncThunkConfig,
  type OrderQueryParameters,
} from '~/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { name as sliceName } from './order.slice.js';

const getOrders = createAsyncThunk<
  OrderResponseDto[],
  Pick<OrderQueryParameters, 'status'>,
  AsyncThunkConfig
>(`${sliceName}/orders`, async (filter, { extra }) => {
  const { ordersApi } = extra;

  return await ordersApi.getOrdersBusiness(filter);
});

const createOrder = createAsyncThunk<
  OrderResponseDto,
  OrderCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-order`, async (payload, { extra }) => {
  const { ordersApi } = extra;

  try {
    const result = await ordersApi.createOrder(payload);

    notification.success('Order successfully created');

    return result;
  } catch (error: unknown) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

const calculateOrderPrice = createAsyncThunk<
  OrderCalculatePriceResponseDto,
  OrderCalculatePriceRequestDto,
  AsyncThunkConfig
>(`${sliceName}/calculateOrderPrice`, (payload, { extra }) => {
  const { ordersApi } = extra;

  return ordersApi.calculatePrice(payload);
});

export { calculateOrderPrice, createOrder, getOrders };
