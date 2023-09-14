import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderFindByIdResponseDto,
  type OrderUpdateResponseDto,
} from '~/packages/orders/libs/types/types.js';

import { ActionNames } from './libs/enums/action-names.enum.js';

const getOrder = createAsyncThunk<
  OrderFindByIdResponseDto,
  string,
  AsyncThunkConfig
>(ActionNames.GET_ORDER, (orderId, { extra }) => {
  const { orderApi } = extra;

  return orderApi.getOrder(orderId);
});

const updateOrderFromSocket = createAsyncThunk<
  OrderUpdateResponseDto,
  OrderUpdateResponseDto,
  AsyncThunkConfig
>(ActionNames.SOCKET.UPDATE_ORDER, (order) => {
  return order;
});

const listenOrderUpdates = createAction(
  ActionNames.SOCKET.LISTEN_ORDER_UPDATES,
  (orderId: string) => {
    return {
      payload: orderId,
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

export {
  getOrder,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
};
