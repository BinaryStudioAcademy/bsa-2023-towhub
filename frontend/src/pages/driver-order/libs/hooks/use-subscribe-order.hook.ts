import {
  useAppDispatch,
  useBlocker,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as orderActions } from '~/slices/orders/order.js';

const useSubscribeUpdates = (orderId: string | undefined): void => {
  const dispatch = useAppDispatch();
  useBlocker(
    useCallback(() => {
      if (orderId) {
        void dispatch(orderActions.unsubscribeOrderUpdates(orderId));
      }

      return false;
    }, [dispatch, orderId]),
  );

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.subscribeOrderUpdates(orderId));
    }
  }, [orderId, dispatch]);
};

export { useSubscribeUpdates };
