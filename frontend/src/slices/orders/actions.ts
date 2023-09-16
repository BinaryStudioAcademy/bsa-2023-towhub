import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/libs/types/types.js';

import { ActionNames } from './libs/enums/enums.js';
import { jsonToLatLngLiteral } from './libs/helpers/json-to-lat-lng-literal.helper.js';
import { type RouteData } from './libs/types/types.js';

const getOrder = createAsyncThunk<OrderResponseDto, string, AsyncThunkConfig>(
  ActionNames.GET_ORDER,
  (orderId, { extra }) => {
    const { orderApi } = extra;

    return orderApi.getOrder(orderId);
  },
);

const getRouteData = createAsyncThunk<
  RouteData,
  { origin: string; destination: string },
  AsyncThunkConfig
>(ActionNames.GET_ORDER_POINTS, async ({ origin, destination }, { extra }) => {
  const { mapServiceFactory } = extra;
  const routeData = {
    origin: jsonToLatLngLiteral(origin),
    destination: jsonToLatLngLiteral(destination),
  };

  const mapService = await mapServiceFactory();
  const [originName, destinationName, distanceAndDuration] = await Promise.all([
    mapService.getPointName(routeData.origin),
    mapService.getPointName(routeData.destination),
    mapService.calculateDistanceAndDuration(
      routeData.origin,
      routeData.destination,
    ),
  ]);

  return {
    origin: originName,
    destination: destinationName,
    distanceAndDuration,
  };
});

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

export {
  getOrder,
  getRouteData,
  listenOrderUpdates,
  stopListenOrderUpdates,
  updateOrderFromSocket,
};
