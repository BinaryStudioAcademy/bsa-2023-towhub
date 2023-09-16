import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';

import { OrderList } from '../components.js';
import { Map } from '../map/map.js';
import styles from './styles.module.scss';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    void dispatch(ordersActions.getOrders());
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      <div>
        <div>Filter</div>
        <OrderList orders={orders} />
      </div>
      <Map
        center={{ lat: -34.397, lng: 150.644 }}
        zoom={8}
        className={styles.mapArea}
      />
    </div>
  );
};

export { Orders };
