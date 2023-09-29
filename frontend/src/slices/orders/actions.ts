import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { type OrdersListResponseDto } from 'shared/build/index.js';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig, type Coordinates } from '~/libs/types/types.js';
import {
  type OrderCreateFormDto,
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateAcceptStatusResponseDto,
} from '~/packages/orders/libs/types/types.js';
import {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderFindAllUserOrdersResponseDto,
  type OrderResponseDto,
} from '~/packages/orders/orders.js';

import { ActionName } from './libs/enums/enums.js';
import { notificateOrderStatusChange } from './libs/helpers/notificate-order-status-change.helper.js';
import { type RouteAddresses, type RouteData } from './libs/types/types.js';
import { name as sliceName } from './order.slice.js';

const getBusinessOrders = createAsyncThunk<
  OrdersListResponseDto,
  string,
  AsyncThunkConfig<null>
>(`${sliceName}/orders`, async (queryString, { extra }) => {
  const { ordersApi } = extra;

  return await ordersApi.getBusinessOrders(queryString);
});

const changeAcceptOrderStatusByDriver = createAsyncThunk<
  OrderUpdateAcceptStatusResponseDto,
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig<null>
>(
  ActionName.CHANGE_ACCEPT_ORDER_STATUS,
  ({ newStatus, orderId }, { extra }) => {
    const { ordersApi } = extra;

    notificateOrderStatusChange(newStatus);

    return ordersApi.changeAcceptOrderStatusByDriver(orderId, { newStatus });
  },
);

const changeAcceptOrderStatusByCustomer = createAsyncThunk<
  OrderUpdateAcceptStatusResponseDto,
  OrderUpdateAcceptStatusRequestDto & { orderId: string },
  AsyncThunkConfig<null>
>(
  ActionName.CHANGE_ACCEPT_ORDER_STATUS,
  ({ newStatus, orderId }, { extra }) => {
    const { ordersApi } = extra;

    return ordersApi.changeAcceptOrderStatusByCustomer(orderId, { newStatus });
  },
);

const createOrder = createAsyncThunk<
  OrderResponseDto,
  OrderCreateFormDto,
  AsyncThunkConfig<null>
>(`${sliceName}/create-order`, async (payload, { extra }) => {
  const { ordersApi, mapServiceFactory } = extra;

  const mapService = await mapServiceFactory({ mapElement: null });

  const startPoint = await mapService.getAddressPoint(payload.startPoint);
  const endPoint = await mapService.getAddressPoint(payload.endPoint);

  try {
    const result = await ordersApi.createOrder({
      ...payload,
      endPoint,
      startPoint,
    });

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
  AsyncThunkConfig<null>
>(`${sliceName}/calculateOrderPrice`, (payload, { extra }) => {
  const { ordersApi } = extra;

  return ordersApi.calculatePrice(payload);
});

const getUserOrdersPage = createAsyncThunk<
  OrderFindAllUserOrdersResponseDto,
  string | undefined,
  AsyncThunkConfig
>(
  ActionName.GET_USER_ORDERS_PAGE,
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

const getRouteAddresses = createAsyncThunk<
  Partial<Record<RouteAddresses['orderId'], RouteAddresses['points']>>,
  {
    points: { origin: Coordinates; destination: Coordinates };
    orderId: number;
  },
  AsyncThunkConfig<null>
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
      origin: origin,
      destination: destination,
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

const getOrder = createAsyncThunk<
  OrderResponseDto,
  string,
  AsyncThunkConfig<null>
>(ActionName.GET_ORDER, (orderId, { extra }) => {
  const { ordersApi } = extra;

  return ordersApi.getOrder(orderId);
});

const getRouteData = createAsyncThunk<
  RouteData,
  { origin: Coordinates; destination: Coordinates },
  AsyncThunkConfig<null>
>(ActionName.GET_ORDER_POINTS, async ({ origin, destination }, { extra }) => {
  const { mapServiceFactory } = extra;
  const routeData = {
    origin,
    destination,
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

const createOrderFromSocket = createAsyncThunk<
  OrderResponseDto,
  OrderResponseDto,
  AsyncThunkConfig<null>
>(ActionName.SOCKET.CREATE_ORDER, (order) => {
  return order;
});

const updateOrderFromSocket = createAsyncThunk<
  OrderResponseDto,
  OrderResponseDto,
  AsyncThunkConfig<null>
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
  createOrderFromSocket,
  getBusinessOrders,
  getOrder,
  getRouteAddresses,
  getRouteData,
  getUserOrdersPage,
  removeOrder,
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
};
