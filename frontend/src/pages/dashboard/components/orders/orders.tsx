import { OrderList } from '~/libs/components/components.js';
import { jsonToLatLngLiteral } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useEffect,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type PlaceLatLng } from '~/libs/packages/map/libs/types/types.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';
import { selectOrders } from '~/slices/orders/selectors.js';

import styles from './styles.module.scss';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);

  const [endPointMarkers, setEndPointMarkers] = useState<
    google.maps.LatLngLiteral[]
  >([]);

  const [shownRoute, setShownRoute] = useState<PlaceLatLng>();

  const mapReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void dispatch(ordersActions.getBusinessOrders());
  }, [dispatch]);

  useEffect(() => {
    setEndPointMarkers(
      orders.map((order) => jsonToLatLngLiteral(order.endPoint)),
    );
  }, [orders]);

  useAppMap({
    mapReference: mapReference,
    points: endPointMarkers,
    shownRoute,
    center: null,
    destination: null,
  });

  return (
    <div className={styles.orders}>
      <div className={styles.orderlistArea}>
        <div>Filter</div>
        <OrderList orders={orders} onSelect={setShownRoute} />
      </div>
      <div className={styles.mapArea}>
        <div className={styles.mapWrapper}>
          <div ref={mapReference} id="map" className={styles.mapWrapper} />
        </div>
      </div>
    </div>
  );
};

export { Orders };
