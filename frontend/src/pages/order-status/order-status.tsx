import { Button, OrderCard } from '~/libs/components/components.js';
import { OrderStatus } from '~/libs/components/orders-status/order-status.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useRef,
} from '~/libs/hooks/hooks.js';
import { jsonToLatLngLiteral } from '~/slices/orders/libs/helpers/json-to-lat-lng-literal.helper.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectOrder } from '~/slices/orders/selectors.js';
import {
  selectChosenTruck,
  selectTruckLocation,
} from '~/slices/trucks/selectors.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { OrderStatus as OrderStatusEnum } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [order] = useAppSelector(selectOrder);
  const status = order?.status;
  const pendingScreen = status === OrderStatusEnum.PENDING;
  const cancelScreen = status === OrderStatusEnum.CANCELED;
  const confirmScreen = status === OrderStatusEnum.CONFIRMED;
  const onPointScreen = status === OrderStatusEnum.PICKING_UP;
  const doneScreen = status === OrderStatusEnum.DONE;
  const truckId = useAppSelector(selectChosenTruck)?.id;

  const truckLocation = useAppSelector(selectTruckLocation);

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.getOrder(orderId));
      void dispatch(orderActions.listenOrderUpdates(orderId));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    if (truckId) {
      void dispatch(truckActions.listenTruckUpdates(truckId));
    }
  }, [truckId, dispatch]);

  const handleHomepageClick = useCallback(() => {
    navigate(AppRoute.ROOT);
  }, [navigate]);

  const handleCancelClick = useCallback(() => {
    //TODO
  }, []);
  const handlePayClick = useCallback(() => {
    //TODO
  }, []);

  const Card = (): JSX.Element | null => {
    if (!cancelScreen && !doneScreen) {
      return (
        <OrderCard
          isDriverShown={confirmScreen || onPointScreen || doneScreen}
          className={styles.card}
        />
      );
    }

    return null;
  };

  const isDeclineButtonShown = pendingScreen || confirmScreen;
  const isPayNowButtonShown = onPointScreen;
  const isHomepageButtonShown = cancelScreen || doneScreen;
  const ButtonsSection = (): JSX.Element => (
    <section className={styles.buttonsSection}>
      {isDeclineButtonShown && (
        <Button
          label="DECLINE"
          className={styles.buttonDecline}
          size={'md'}
          onClick={handleCancelClick}
        />
      )}
      {isPayNowButtonShown && (
        <Button
          label="PAY NOW"
          className={styles.buttonPayNow}
          size={'md'}
          onClick={handlePayClick}
        />
      )}
      {isHomepageButtonShown && (
        <Button
          label="HOMEPAGE"
          className={styles.buttonHomepage}
          size={'md'}
          onClick={handleHomepageClick}
        />
      )}
    </section>
  );
  const mapReference = useRef<HTMLDivElement>(null);

  useAppMap({
    center: truckLocation,
    destination: order ? jsonToLatLngLiteral(order.startPoint) : null,
    zoom: 15,
    className: styles.map,
    mapReference: mapReference,
  });

  const MapElement = useCallback(
    () => <div ref={mapReference} id="map" className={styles.map} />,
    [],
  );

  return (
    <div className={styles.container}>
      <OrderStatus
        className={getValidClassNames(
          styles.status,
          styles.statusTop,
          (cancelScreen || doneScreen) && styles.statusBig,
        )}
      />
      {!cancelScreen && !doneScreen && (
        <section className={styles.mapSection}>
          <MapElement />
        </section>
      )}
      <section className={styles.cardSection}>
        <OrderStatus
          className={getValidClassNames(styles.status, styles.statusBottom)}
        />
        <Card />
        <ButtonsSection />
      </section>
    </div>
  );
};

export { OrderStatusPage as OrderStatus };
