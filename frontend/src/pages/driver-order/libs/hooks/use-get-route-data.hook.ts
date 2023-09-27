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
  origin?: string | null;
  destination?: string | null;
} => {
  const routeData = useAppSelector(selectOrderData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (order) {
      void dispatch(
        orderActions.getRouteData({
          origin: order.startPoint,
          destination: order.endPoint,
        }),
      );
    }
  }, [dispatch, order]);
  const { distanceAndDuration, origin, destination } = routeData ?? {};

  const { distance, duration } = distanceAndDuration ?? {};
  const { text: distanceLeft = '' } = distance ?? {};
  const { text: timespanLeft = '' } = duration ?? {};

  return { distanceLeft, timespanLeft, origin, destination };
};

export { useGetRouteData };
