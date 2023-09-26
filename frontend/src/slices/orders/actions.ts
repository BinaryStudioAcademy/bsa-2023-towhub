import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderFindAllDriverOrdersResponseDto,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { ActionName } from './libs/enums/enums.js';
import { jsonToLatLngLiteral } from './libs/helpers/json-to-lat-lng-literal.helper.js';
import { type RouteAddresses, type RouteData } from './libs/types/types.js';
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

const getRouteAddresses = createAsyncThunk<
  Partial<Record<RouteAddresses['orderId'], RouteAddresses['points']>>,
  { points: { origin: string; destination: string }; orderId: number },
  AsyncThunkConfig
>(
  ActionName.GET_ORDER_ADDRESSES,
  async ({ points, orderId }, { extra, getState }) => {
    const routeAddresses = getState().orders.routeAddresses;

    if (routeAddresses[orderId]) {
      return routeAddresses;
    }

    const { origin, destination } = points;
    const { mapServiceFactory } = extra;
    const routeData = {
      origin: jsonToLatLngLiteral(origin),
      destination: jsonToLatLngLiteral(destination),
    };

    const mapService = await mapServiceFactory({ mapElement: null });
    const [originName, destinationName] = await Promise.all([
      mapService.getPointAddress(routeData.origin),
      mapService.getPointAddress(routeData.destination),
    ]);

    return {
      [orderId]: {
        origin: originName,
        destination: destinationName,
      },
    };
  },
);

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
const getDriverOrdersPage = createAsyncThunk<
  OrderFindAllDriverOrdersResponseDto,
  string | undefined,
  AsyncThunkConfig
>(
  `${sliceName}/orderFindAllDriverOrdersResponse`,
  async (payload, { rejectWithValue, extra }) => {
    try {
      return await extra.ordersApi.getAllDriverOrders(payload);
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(getErrorMessage(error.message));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

export {
  calculateOrderPrice,
  createOrder,
  getDriverOrdersPage,
  getOrder,
  getRouteAddresses,
  getRouteData,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
};
