import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderFindByIdResponseDto,
  type OrderUpdateResponseDto,
} from '~/packages/orders/libs/types/types.js';

import { ActionNames } from './libs/enums/enums.js';
import { jsonToLatLngLiteral } from './libs/helpers/json-to-lat-lng-literal.helper.js';
import { type OrderPoints } from './libs/types/types.js';

const getOrder = createAsyncThunk<
  OrderFindByIdResponseDto,
  string,
  AsyncThunkConfig
>(ActionNames.GET_ORDER, (orderId, { extra }) => {
  const { orderApi } = extra;

  return orderApi.getOrder(orderId);
});

const getPointsNames = createAsyncThunk<
  OrderPoints,
  { origin: string; destination: string },
  AsyncThunkConfig
>(ActionNames.GET_ORDER_POINTS, async ({ origin, destination }, { extra }) => {
  const { mapServiceFactory } = extra;
  const orderPoints = {
    origin: jsonToLatLngLiteral(origin),
    destination: jsonToLatLngLiteral(destination),
  };

  const mapService = await mapServiceFactory();
  const [originName, destinationName] = await Promise.all([
    mapService.getPointName(orderPoints.origin),
    mapService.getPointName(orderPoints.destination),
  ]);

  return { origin: originName, destination: destinationName };
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
  getOrder,
  getPointsNames,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
};
