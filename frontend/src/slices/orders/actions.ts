import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderStatusValues,
  type OrderUpdateAcceptStatusRequestDto,
} from '~/packages/orders/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { ActionNames } from './libs/enums/enums.js';
import { name as sliceName } from './order.slice.js';

const changeAcceptOrderStatusByDriver = createAsyncThunk<
  { id: number; status: OrderStatusValues },
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig
>(
  ActionNames.CHANGE_ACCEPT_ORDER_STATUS,
  ({ isAccepted, orderId }, { extra }) => {
    const { ordersApi } = extra;

    return ordersApi.changeAcceptOrderStatusByDriver(orderId, { isAccepted });
  },
);

const changeAcceptOrderStatusByCustomer = createAsyncThunk<
  { id: number; status: OrderStatusValues },
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig
>(
  ActionNames.CHANGE_ACCEPT_ORDER_STATUS,
  ({ isAccepted, orderId }, { extra }) => {
    const { ordersApi } = extra;

    return ordersApi.changeAcceptOrderStatusByCustomer(orderId, { isAccepted });
  },
);

const updateOrderFromSocket = createAsyncThunk<
  OrderResponseDto,
  OrderResponseDto,
  AsyncThunkConfig
>(ActionNames.SOCKET.UPDATE_ORDER, (order) => {
  return order;
});

const listenOrderUpdates = createAction(
  ActionNames.SOCKET.LISTEN_ORDER_UPDATES,
  (orderId: string) => {
    return {
      payload: `${orderId}`,
    };
  },
);

const stopListenOrderUpdates = createAction(
  ActionNames.SOCKET.STOP_LISTEN_ORDER_UPDATES,
  (orderId: string) => {
    return {
      payload: orderId,
    };
  },
);

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

export {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
};
