import {
  useAppDispatch,
  useBlocker,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

const useSubscribeUpdates = (
  orderId: string | undefined,
  truckId: number | undefined,
): void => {
  const dispatch = useAppDispatch();
  useBlocker(
    useCallback(() => {
      if (truckId) {
        void dispatch(truckActions.unsubscribeTruckUpdates(truckId));
      }

      if (orderId) {
        void dispatch(orderActions.unsubscribeOrderUpdates(orderId));
      }

      return false;
    }, [dispatch, orderId, truckId]),
  );

  useEffect(() => {
    if (truckId) {
      void dispatch(truckActions.subscribeTruckUpdates(truckId));
    }
  }, [truckId, dispatch]);

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.subscribeOrderUpdates(orderId));
    }
  }, [orderId, dispatch]);
};

export { useSubscribeUpdates };
