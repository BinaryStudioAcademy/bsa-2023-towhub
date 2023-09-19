import { type Libraries, LoadScript } from '@react-google-maps/api';

import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';

import { OrderList } from '../components.js';
import { Map } from '../map/map.js';
import { makeLatLngLiteral } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  const [endPointMarkers, setEndPointMarkers] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >();

  const [shownRoute, setShownRoute] = useState<{
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  }>();

  useEffect(() => {
    void dispatch(ordersActions.getOrders());
  }, [dispatch]);

  useEffect(() => {
    setEndPointMarkers(
      orders.map((order) => makeLatLngLiteral(order.endPoint)),
    );
  }, [orders]);

  return (
    <div className={styles.orders}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <div className={styles.orderlistArea}>
          <div>Filter</div>
          <OrderList orders={orders} select={setShownRoute} />
        </div>
        <div className={styles.mapArea}>
          <div className={styles.mapWrapper}>
            <Map
              zoom={10}
              className={styles.map}
              markers={endPointMarkers}
              shownRoute={shownRoute}
            />
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export { Orders };
