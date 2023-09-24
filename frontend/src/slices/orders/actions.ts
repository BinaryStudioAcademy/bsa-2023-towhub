import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderFindAllUserOrdersResponse,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { ACTIONS_TYPES } from './libs/enums/order-action.js';
import { name as sliceName } from './order.slice.js';

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

const getUserOrdersPage = createAsyncThunk<
  OrderFindAllUserOrdersResponse,
  string | undefined,
  AsyncThunkConfig
>(
  ACTIONS_TYPES.GET_USER_ORDERS_PAGE,
  async (payload, { rejectWithValue, extra }) => {
    try {
      return await extra.ordersApi.getAllUserOrders(payload);
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(getErrorMessage(error.message));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

export { calculateOrderPrice, createOrder, getUserOrdersPage };
