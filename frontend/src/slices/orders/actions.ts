import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
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

import { ActionName } from './libs/enums/enums.js';
import { jsonToLatLngLiteral } from './libs/helpers/json-to-lat-lng-literal.helper.js';
import { type RouteData } from './libs/types/types.js';
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

const getOrder = createAsyncThunk<OrderResponseDto, string, AsyncThunkConfig>(
  ActionName.GET_ORDER,
  (orderId, { extra }) => {
    const { ordersApi } = extra;

    return ordersApi.getOrder(orderId);
  },
);

const getRouteData = createAsyncThunk<
  RouteData,
  { origin: string; destination: string },
  AsyncThunkConfig
>(ActionName.GET_ORDER_POINTS, async ({ origin, destination }, { extra }) => {
  const { mapServiceFactory } = extra;
  const routeData = {
    origin: jsonToLatLngLiteral(origin),
    destination: jsonToLatLngLiteral(destination),
  };

  const mapService = await mapServiceFactory({ mapElement: null });
  const [originName, destinationName, distanceAndDuration] = await Promise.all([
    mapService.getPointAddress(routeData.origin),
    mapService.getPointAddress(routeData.destination),
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
>(ActionName.SOCKET.UPDATE_ORDER, (order) => {
  return order;
});

const subscribeOrderUpdates = createAction(
  ActionName.SOCKET.SUBSCRIBE_ORDER_UPDATES,
  (orderId: string) => {
    return {
      payload: `${orderId}`,
    };
  },
);

const unsubscribeOrderUpdates = createAction(
  ActionName.SOCKET.UNSUBSCRIBE_ORDER_UPDATES,
  (orderId: string) => {
    return {
      payload: `${orderId}`,
    };
  },
);

export {
  calculateOrderPrice,
  createOrder,
  getOrder,
  getOrdersBusiness,
  getRouteData,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
};
