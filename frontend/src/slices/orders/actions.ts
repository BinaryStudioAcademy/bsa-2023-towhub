import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateAcceptStatusResponseDto,
} from '~/packages/orders/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderFindAllUserOrdersResponseDto,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { ActionName } from './libs/enums/enums.js';
import { ACTIONS_TYPES } from './libs/enums/order-action.js';
import { jsonToLatLngLiteral } from './libs/helpers/json-to-lat-lng-literal.helper.js';
import { type RouteData } from './libs/types/types.js';
import { name as sliceName } from './order.slice.js';

const getBusinessOrders = createAsyncThunk<
  OrderResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/orders`, async (_, { extra }) => {
  const { ordersApi } = extra;

  return await ordersApi.getBusinessOrders();
});
const changeAcceptOrderStatusByDriver = createAsyncThunk<
  OrderUpdateAcceptStatusResponseDto,
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig
>(
  ActionName.CHANGE_ACCEPT_ORDER_STATUS,
  ({ isAccepted, orderId }, { extra }) => {
    const { ordersApi } = extra;

    return ordersApi.changeAcceptOrderStatusByDriver(orderId, { isAccepted });
  },
);

const changeAcceptOrderStatusByCustomer = createAsyncThunk<
  OrderUpdateAcceptStatusResponseDto,
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig
>(
  ActionName.CHANGE_ACCEPT_ORDER_STATUS,
  ({ isAccepted, orderId }, { extra }) => {
    const { ordersApi } = extra;

    return ordersApi.changeAcceptOrderStatusByCustomer(orderId, { isAccepted });
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

const getUserOrdersPage = createAsyncThunk<
  OrderFindAllUserOrdersResponseDto,
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

const getOrder = createAsyncThunk<OrderResponseDto, string, AsyncThunkConfig>(
  ActionName.GET_ORDER,
  async (orderId, { extra }) => {
    const { ordersApi } = extra;

    return await ordersApi.getOrder(orderId);
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

const removeOrder = createAction(
  ActionName.REMOVE_ORDER,
  (orderId: string) => ({
    payload: orderId,
  }),
);

export {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  getBusinessOrders,
  getOrder,
  getRouteData,
  getUserOrdersPage,
  removeOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
};
