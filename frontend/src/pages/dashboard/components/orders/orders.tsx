import { type Libraries, LoadScript } from '@react-google-maps/api';

import { Map, OrderFilter, OrderList } from '~/libs/components/components.js';
import { jsonToLatLngLiteral } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';
import {
  type OrderQueryParameters,
  type OrderResponseDto,
} from '~/libs/types/types.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';
import { selectOrders } from '~/slices/orders/selectors.js';

import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);

  const [endPointMarkers, setEndPointMarkers] =
    useState<google.maps.LatLngLiteral[]>();

  const [shownRoute, setShownRoute] = useState<{
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  }>();

  const [filter, setFilter] = useState<{
    status: OrderQueryParameters['status'];
  }>({
    status: 'all',
  });

  useEffect(() => {
    void dispatch(ordersActions.getOrders(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    setEndPointMarkers(
      orders.map((order) => jsonToLatLngLiteral(order.endPoint)),
    );
  }, [orders]);

  const sortOrders = useMemo(
    () =>
      [...orders].sort(
        (a: OrderResponseDto, b: OrderResponseDto) =>
          new Date(a.scheduledTime).getTime() -
          new Date(b.scheduledTime).getTime(),
      ),
    [orders],
  );

  return (
    <div className={styles.orders}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <div className={styles.orderlistArea}>
          <OrderFilter onChange={setFilter} />
          <OrderList orders={sortOrders} select={setShownRoute} />
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
