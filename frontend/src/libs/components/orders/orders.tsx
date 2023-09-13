import { useAppDispatch, useEffect } from '~/libs/hooks/hooks.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(ordersActions.getOrders());
  }, [dispatch]);

  return <div>Orders</div>;
};

export { Orders };
