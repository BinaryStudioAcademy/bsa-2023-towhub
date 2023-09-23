import { createAsyncThunk } from '@reduxjs/toolkit';
import { type OrdersListResponseDto } from 'shared/build/index.js';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { name as sliceName } from './order.slice.js';

const getOrdersBusiness = createAsyncThunk<
  OrdersListResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/orders`, async (queryString, { extra }) => {
  const { ordersApi } = extra;

  return await ordersApi.getOrdersBusiness(queryString);
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

export { calculateOrderPrice, createOrder, getOrdersBusiness };
