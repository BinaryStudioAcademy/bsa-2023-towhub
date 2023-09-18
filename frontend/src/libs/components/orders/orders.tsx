import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  // useState,
} from '~/libs/hooks/hooks.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';

import { OrderList } from '../components.js';
// import { Map } from '../map/map.js';
// import { makeLatLngLiteral } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  // const [endPointMarkers, setendPointMarkers] = useState<string>([]);

  // const [shownRoute, setShownRoute] = useState<{
  //   startPoint: google.maps.LatLngLiteral;
  //   endPoint: google.maps.LatLngLiteral;
  // }>();

  useEffect(() => {
    void dispatch(ordersActions.getOrders());
  }, [dispatch]);

  // useEffect(() => {
  //   setendPointMarkers(
  //     orders.map((order) => makeLatLngLiteral(order.endPoint)),
  //   );
  // }, [orders]);

  return (
    <div className={styles.orders}>
      <div className={styles.orderlistArea}>
        <div>Filter</div>
        <OrderList orders={orders} />
      </div>
      <div className={styles.mapArea}>
        <div className={styles.mapWrapper}>
          {/* <Map
            center={{ lat: -34.397, lng: 150.644 }}
            zoom={9}
            className={styles.map}
            markers={endPointMarkers}
            shownRoute={shownRoute}
          /> */}
        </div>
      </div>
    </div>
  );
};

export { Orders };
