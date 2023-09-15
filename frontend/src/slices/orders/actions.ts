import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateResponseDto,
} from '~/packages/orders/libs/types/types.js';

import { ActionNames } from './libs/enums/enums.js';

const changeAcceptOrderStatus = createAsyncThunk<
  OrderUpdateResponseDto,
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig
>(
  ActionNames.CHANGE_ACCEPT_ORDER_STATUS,
  ({ isAccepted, orderId }, { extra }) => {
    const { orderApi } = extra;

    return orderApi.changeAcceptOrderStatus(orderId, { isAccepted });
  },
);

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

export {
  changeAcceptOrderStatus,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
};
