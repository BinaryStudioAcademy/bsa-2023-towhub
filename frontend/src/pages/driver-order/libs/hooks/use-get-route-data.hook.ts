import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type OrderResponseDto } from '~/packages/orders/libs/types/types.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectOrderData } from '~/slices/orders/selectors.js';

const useGetRouteData = (
  order: OrderResponseDto | null,
): {
  distanceLeft: string;
  timespanLeft: string;
  startPoint?: google.maps.LatLngLiteral | null;
  endPoint?: google.maps.LatLngLiteral | null;
} => {
  const routeData = useAppSelector(selectOrderData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (order) {
      void dispatch(
        orderActions.getRouteDataFromAddresses({
          origin: order.startPoint,
          destination: order.endPoint,
        }),
      );
    }
  }, [dispatch, order]);
  const { distanceAndDuration, startPoint, endPoint } = routeData ?? {};

  const { distance, duration } = distanceAndDuration ?? {};
  const { text: distanceLeft = '' } = distance ?? {};
  const { text: timespanLeft = '' } = duration ?? {};

  return { distanceLeft, timespanLeft, startPoint, endPoint };
};

export { useGetRouteData };
